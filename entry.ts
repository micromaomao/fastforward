class PlayerContext {
  root: HTMLElement;
  video_element: HTMLVideoElement;
  video_blob: Blob;
  video_blob_url: string;
  loading: boolean;
  segment_duration: number;
  segment_amplitudes: number[];
  cutoff_amplitude: number;
  timeline_canvas: HTMLCanvasElement;
  normal_rate: number;
  ff_rate: number;
  lookahead_segments: number;
  should_ffs: boolean[];
  visited: boolean[];
  skip_length: number;
  is_mouse_down_on_timeline: boolean;
  paused_before_mouse_down: boolean;
  constructor(root: HTMLElement) {
    this.root = root;
    this.loading = false;
    this.segment_duration = 0.1;
    this.cutoff_amplitude = 0.007;
    this.normal_rate = 2.0;
    this.ff_rate = 7.0;
    this.lookahead_segments = 20;
    this.skip_length = 1;
    this.timeline_canvas_mousedown = this.timeline_canvas_mousedown.bind(this);
    this.timeline_canvas_mouseup = this.timeline_canvas_mouseup.bind(this);
    this.timeline_canvas_mousemove = this.timeline_canvas_mousemove.bind(this);
    this.is_mouse_down_on_timeline = false;
    window.addEventListener("resize", evt => {
      if (this.timeline_canvas) {
        this.render_timeline();
      }
    });
    setInterval(() => {
      this.update();
    }, 20);
    window.addEventListener("keydown", evt => {
      evt.preventDefault();
      if (this.video_element) {
        if (evt.key === "ArrowLeft") {
          this.video_element.currentTime -= this.skip_length;
        } else if (evt.key === "ArrowRight") {
          this.video_element.currentTime += this.skip_length;
        }
      }
    });
    root.innerHTML = `<div class="file-select">
                        <div>Drop or select a video file.</div>
                        <input type="file">
                      </div>`;
    root.querySelector("input").addEventListener("change", evt => {
      let files = (evt.target as any).files as FileList;
      let file = files[0];
      this.handle_file(file);
    });
  }

  async handle_file(file: File) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.video_element = null;
    this.video_blob = null;
    this.video_blob_url = null;
    this.segment_amplitudes = null;
    this.timeline_canvas = null;
    this.should_ffs = null;
    this.visited = null;
    this.root.innerHTML = `<div class="loading">
                              <div class="title">Processing audio...</div>
                              <div class="substep"></div>
                              <div class="progress"><div class="filled"></div></div>
                            </div>`;
    let progress_filled = this.root.querySelector(".loading .progress .filled") as HTMLElement;
    progress_filled.style.width = "0%";
    let substep_ele = this.root.querySelector(".loading .substep") as HTMLElement;

    function update_progress(precentage: number, substep: string) {
      progress_filled.style.width = `${Math.round(precentage * 100)}%`;
      substep_ele.textContent = substep;
    }

    try {
      update_progress(0, "Initalizing audio context");
      this.video_element = document.createElement("video");
      this.video_blob = file;
      this.video_blob_url = URL.createObjectURL(this.video_blob);
      this.video_element.addEventListener("error", evt => {
        let e = this.video_element.error.message;
        this.handle_error(e);
      });
      for (let ev of ["keydown", "keyup", "keypress"]) {
        this.video_element.addEventListener(ev, evt => {
          evt.preventDefault();
        });
      }
      this.video_element.src = this.video_blob_url;
      this.video_element.controls = true;

      let audioctx = new AudioContext();
      update_progress(0, "Decoding audio");
      let audiobuf = await audioctx.decodeAudioData(await this.video_blob.arrayBuffer());
      update_progress(0, "Analyzing audio");
      await this.analyze_audio(audiobuf, update_progress);
      update_progress(100, "Building fast forward condition table");
      this.build_should_ff_table();
      this.timeline_canvas = document.createElement("canvas");
      this.timeline_canvas.classList.add("timeline");
      this.timeline_canvas.addEventListener("mousedown", this.timeline_canvas_mousedown);
    } catch (e) {
      this.handle_error(e);
      return;
    }

    this.root.innerHTML = "";
    this.root.appendChild(this.video_element);
    this.root.appendChild(this.timeline_canvas);
    this.render_timeline();
    this.loading = false;
  }

  handle_error(e: Error | string) {
    console.error(e);
    if (this.loading) {
      let loading_ele = this.root.querySelector(".loading");
      loading_ele.classList.add("error");
      loading_ele.innerHTML = `<div class="title">An error occurred.</div><div class="error-content"></div>`;
      loading_ele.querySelector(".error-content").textContent = e.toString();
      this.loading = false;
    } else {
      this.root.innerHTML = `<div class="loading error"></div>`;
      this.loading = true;
      this.handle_error(e);
    }
  }

  async analyze_audio(audiobuf: AudioBuffer, update_progress: (number, string) => void) {
    let sr = audiobuf.sampleRate;
    let slen = audiobuf.length;
    let segment_size = Math.ceil(this.segment_duration * sr);
    let channal_data: Float32Array[] = [];
    for (let c = 0; c < audiobuf.numberOfChannels; c++) {
      channal_data.push(audiobuf.getChannelData(c));
    }
    let last_progress_update = performance.now();
    let amplitudes: number[] = [];
    const progress_update_interval = 40;
    for (let i = 0; i < slen; i += segment_size) {
      let max_amplitude = -Infinity;
      for (let data of channal_data) {
        let upper = -Infinity;
        let lower = Infinity;
        for (let s = i; s < i + segment_size; s++) {
          let sample = data[s];
          if (sample > upper) {
            upper = sample;
          }
          if (sample < lower) {
            lower = sample;
          }
        }
        let amp = upper - lower;
        if (amp > max_amplitude) {
          max_amplitude = amp;
        }
      }
      amplitudes.push(max_amplitude);

      let now = performance.now();
      if (now - last_progress_update > progress_update_interval) {
        update_progress(i / slen, `Reading samples (${i} / ${slen})`);
        await new Promise((resolve, _) => setTimeout(resolve, 0));
        last_progress_update = now;
      }
    }
    this.segment_amplitudes = amplitudes;
  }

  build_should_ff_table() {
    this.should_ffs = [];
    for (let s = 0; s < this.segment_amplitudes.length; s++) {
      let should_ff = true;
      for (let ss = s; ss < s + this.lookahead_segments + 1 && ss < this.segment_amplitudes.length; ss++) {
        let amp = this.segment_amplitudes[ss];
        if (amp > this.cutoff_amplitude) {
          should_ff = false;
          break;
        }
      }
      this.should_ffs.push(should_ff);
    }
    this.visited = [];
    for (let s = 0; s < this.should_ffs.length; s++) {
      this.visited.push(false);
    }
  }

  current_segment_index(): number {
    return Math.floor(this.video_element.currentTime / this.segment_duration);
  }

  render_timeline() {
    let dpi = window.devicePixelRatio;
    let css_size = window.getComputedStyle(this.timeline_canvas);
    let css_width = parseFloat(css_size.width);
    let css_height = parseFloat(css_size.height);
    let pixel_width = Math.floor(css_width * dpi);
    let pixel_height = Math.floor(css_height * dpi);
    this.timeline_canvas.width = pixel_width;
    this.timeline_canvas.height = pixel_height;
    let draw_ctx = this.timeline_canvas.getContext("2d");
    draw_ctx.strokeStyle = "transparent";
    let csi = this.current_segment_index();
    for (let i = 0; i < pixel_width; i++) {
      let seg_l = Math.floor(i / pixel_width * this.segment_amplitudes.length);
      let seg_r = Math.floor((i + 1) / pixel_width * this.segment_amplitudes.length);
      if (seg_l >= seg_r) {
        seg_r = seg_l + 1;
      }
      if (seg_r > this.segment_amplitudes.length) {
        seg_r = this.segment_amplitudes.length;
      }
      if (seg_l >= this.segment_amplitudes.length) {
        seg_l = this.segment_amplitudes.length - 1;
      }
      let visited = false;
      if (csi >= seg_l && csi < seg_r) {
        draw_ctx.fillStyle = "red";
      } else {
        let max_amp = -Infinity;
        for (let s = seg_l; s < seg_r; s++) {
          max_amp = Math.max(max_amp, this.segment_amplitudes[s]);
          if (this.visited[s]) {
            visited = true;
          }
        }
        draw_ctx.fillStyle = this.color_ramp(max_amp);
      }
      draw_ctx.fillRect(i, 0, 1, pixel_height);
      if (visited) {
        draw_ctx.fillStyle = "red";
        draw_ctx.fillRect(i, pixel_height / 2, 1, Math.ceil(pixel_height / 2));
      }
    }
  }

  color_ramp(amplitude: number): string {
    if (amplitude > 1) {
      amplitude = 1;
    }
    let grey_level = Math.round(amplitude * 255);
    return `rgb(0, ${grey_level}, ${255 - grey_level})`;
  }

  update() {
    if (!this.timeline_canvas || !this.video_element) {
      return;
    }
    this.render_timeline();
    let segi = this.current_segment_index();
    if (!this.video_element.paused && this.should_ffs[segi] && !this.visited[segi]) {
      this.video_element.playbackRate = this.ff_rate;
    } else {
      this.video_element.playbackRate = this.normal_rate;
    }
    if (!this.video_element.paused) {
      this.visited[segi] = true;
    }
  }

  timeline_canvas_mousedown(evt: MouseEvent) {
    if (this.video_element === null) {
      return;
    }
    window.addEventListener("mouseup", this.timeline_canvas_mouseup);
    window.addEventListener("mousemove", this.timeline_canvas_mousemove);
    evt.preventDefault();
    this.timeline_canvas_mousemove(evt);
    document.body.style.cursor = "none";
    this.video_element.style.pointerEvents = "none";
    this.paused_before_mouse_down = this.video_element.paused;
    this.video_element.pause();
  }
  timeline_canvas_mouseup(evt: MouseEvent) {
    window.removeEventListener("mouseup", this.timeline_canvas_mouseup);
    window.removeEventListener("mousemove", this.timeline_canvas_mousemove);
    document.body.style.cursor = "";
    this.video_element.style.pointerEvents = "";
    if (!this.paused_before_mouse_down) {
      this.video_element.play();
    }
  }
  timeline_canvas_mousemove(evt: MouseEvent) {
    let rect = this.timeline_canvas.getBoundingClientRect();
    let dx = evt.clientX - rect.left;
    let w = rect.width;
    this.video_element.currentTime = this.video_element.duration * (dx/w);
  }
}

function onready(evt) {
  if (document.readyState == "complete") {
    document.removeEventListener("readystatechange", onready);
    let player_container = document.createElement("div");
    player_container.classList.add("player");
    document.body.appendChild(player_container);
    let player = new PlayerContext(player_container);
    init_drop_handler(player);
  }
}
document.addEventListener("readystatechange", onready);
onready(null);

function init_drop_handler(player: PlayerContext) {
  let drop_indicator = document.createElement("div");
  drop_indicator.classList.add("drop-indicator");
  drop_indicator.innerHTML = `<div class="inner">Release to play&hellip;</div>`;

  function drop_done(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    drop_indicator.remove();
  }

  document.body.addEventListener("drop", evt => {
    drop_done(evt);
    let file = evt.dataTransfer?.files[0];
    player.handle_file(file);
  });
  document.body.addEventListener("dragenter", evt => {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.appendChild(drop_indicator);
  });
  document.body.addEventListener("dragleave", drop_done);
  document.body.addEventListener("dragend", drop_done);
  for (let evt of ["dragstart", "dragover", "drag", "drop"]) {
    document.addEventListener(evt, evt => evt.preventDefault());
  }
}
