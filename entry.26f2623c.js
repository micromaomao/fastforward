// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"entry.ts":[function(require,module,exports) {
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var PlayerContext =
/** @class */
function () {
  function PlayerContext(root) {
    var _this = this;

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
    window.addEventListener("resize", function (evt) {
      if (_this.timeline_canvas) {
        _this.render_timeline();
      }
    });
    setInterval(function () {
      _this.update();
    }, 20);
    window.addEventListener("keydown", function (evt) {
      evt.preventDefault();

      if (_this.video_element) {
        if (evt.key === "ArrowLeft") {
          _this.video_element.currentTime -= _this.skip_length;
        } else if (evt.key === "ArrowRight") {
          _this.video_element.currentTime += _this.skip_length;
        }
      }
    });
    root.innerHTML = "<div class=\"file-select\">\n                        <div>Drop or select a video file.</div>\n                        <input type=\"file\">\n                      </div>";
    root.querySelector("input").addEventListener("change", function (evt) {
      var files = evt.target.files;
      var file = files[0];

      _this.handle_file(file);
    });
  }

  PlayerContext.prototype.handle_file = function (file) {
    return __awaiter(this, void 0, void 0, function () {
      function update_progress(precentage, substep) {
        progress_filled.style.width = Math.round(precentage * 100) + "%";
        substep_ele.textContent = substep;
      }

      var progress_filled, substep_ele, _i, _a, ev, audioctx, audiobuf, _b, _c, e_1;

      var _this = this;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (this.loading) {
              return [2
              /*return*/
              ];
            }

            this.loading = true;
            this.video_element = null;
            this.video_blob = null;
            this.video_blob_url = null;
            this.segment_amplitudes = null;
            this.timeline_canvas = null;
            this.should_ffs = null;
            this.visited = null;
            this.root.innerHTML = "<div class=\"loading\">\n                              <div class=\"title\">Processing audio...</div>\n                              <div class=\"substep\"></div>\n                              <div class=\"progress\"><div class=\"filled\"></div></div>\n                            </div>";
            progress_filled = this.root.querySelector(".loading .progress .filled");
            progress_filled.style.width = "0%";
            substep_ele = this.root.querySelector(".loading .substep");
            _d.label = 1;

          case 1:
            _d.trys.push([1, 5,, 6]);

            update_progress(0, "Initalizing audio context");
            this.video_element = document.createElement("video");
            this.video_blob = file;
            this.video_blob_url = URL.createObjectURL(this.video_blob);
            this.video_element.addEventListener("error", function (evt) {
              var e = _this.video_element.error.message;

              _this.handle_error(e);
            });

            for (_i = 0, _a = ["keydown", "keyup", "keypress"]; _i < _a.length; _i++) {
              ev = _a[_i];
              this.video_element.addEventListener(ev, function (evt) {
                evt.preventDefault();
              });
            }

            this.video_element.src = this.video_blob_url;
            this.video_element.controls = true;
            audioctx = new AudioContext();
            update_progress(0, "Decoding audio");
            _c = (_b = audioctx).decodeAudioData;
            return [4
            /*yield*/
            , this.video_blob.arrayBuffer()];

          case 2:
            return [4
            /*yield*/
            , _c.apply(_b, [_d.sent()])];

          case 3:
            audiobuf = _d.sent();
            update_progress(0, "Analyzing audio");
            return [4
            /*yield*/
            , this.analyze_audio(audiobuf, update_progress)];

          case 4:
            _d.sent();

            update_progress(100, "Building fast forward condition table");
            this.build_should_ff_table();
            this.timeline_canvas = document.createElement("canvas");
            this.timeline_canvas.classList.add("timeline");
            this.timeline_canvas.addEventListener("mousedown", this.timeline_canvas_mousedown);
            return [3
            /*break*/
            , 6];

          case 5:
            e_1 = _d.sent();
            this.handle_error(e_1);
            return [2
            /*return*/
            ];

          case 6:
            this.root.innerHTML = "";
            this.root.appendChild(this.video_element);
            this.root.appendChild(this.timeline_canvas);
            this.render_timeline();
            this.loading = false;
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  PlayerContext.prototype.handle_error = function (e) {
    console.error(e);

    if (this.loading) {
      var loading_ele = this.root.querySelector(".loading");
      loading_ele.classList.add("error");
      loading_ele.innerHTML = "<div class=\"title\">An error occurred.</div><div class=\"error-content\"></div>";
      loading_ele.querySelector(".error-content").textContent = e.toString();
      this.loading = false;
    } else {
      this.root.innerHTML = "<div class=\"loading error\"></div>";
      this.loading = true;
      this.handle_error(e);
    }
  };

  PlayerContext.prototype.analyze_audio = function (audiobuf, update_progress) {
    return __awaiter(this, void 0, void 0, function () {
      var sr, slen, segment_size, channal_data, c, last_progress_update, amplitudes, progress_update_interval, i, max_amplitude, _i, channal_data_1, data, upper, lower, s, sample, amp, now;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            sr = audiobuf.sampleRate;
            slen = audiobuf.length;
            segment_size = Math.ceil(this.segment_duration * sr);
            channal_data = [];

            for (c = 0; c < audiobuf.numberOfChannels; c++) {
              channal_data.push(audiobuf.getChannelData(c));
            }

            last_progress_update = performance.now();
            amplitudes = [];
            progress_update_interval = 40;
            i = 0;
            _a.label = 1;

          case 1:
            if (!(i < slen)) return [3
            /*break*/
            , 4];
            max_amplitude = -Infinity;

            for (_i = 0, channal_data_1 = channal_data; _i < channal_data_1.length; _i++) {
              data = channal_data_1[_i];
              upper = -Infinity;
              lower = Infinity;

              for (s = i; s < i + segment_size; s++) {
                sample = data[s];

                if (sample > upper) {
                  upper = sample;
                }

                if (sample < lower) {
                  lower = sample;
                }
              }

              amp = upper - lower;

              if (amp > max_amplitude) {
                max_amplitude = amp;
              }
            }

            amplitudes.push(max_amplitude);
            now = performance.now();
            if (!(now - last_progress_update > progress_update_interval)) return [3
            /*break*/
            , 3];
            update_progress(i / slen, "Reading samples (" + i + " / " + slen + ")");
            return [4
            /*yield*/
            , new Promise(function (resolve, _) {
              return setTimeout(resolve, 0);
            })];

          case 2:
            _a.sent();

            last_progress_update = now;
            _a.label = 3;

          case 3:
            i += segment_size;
            return [3
            /*break*/
            , 1];

          case 4:
            this.segment_amplitudes = amplitudes;
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  PlayerContext.prototype.build_should_ff_table = function () {
    this.should_ffs = [];

    for (var s = 0; s < this.segment_amplitudes.length; s++) {
      var should_ff = true;

      for (var ss = s; ss < s + this.lookahead_segments + 1 && ss < this.segment_amplitudes.length; ss++) {
        var amp = this.segment_amplitudes[ss];

        if (amp > this.cutoff_amplitude) {
          should_ff = false;
          break;
        }
      }

      this.should_ffs.push(should_ff);
    }

    this.visited = [];

    for (var s = 0; s < this.should_ffs.length; s++) {
      this.visited.push(false);
    }
  };

  PlayerContext.prototype.current_segment_index = function () {
    return Math.floor(this.video_element.currentTime / this.segment_duration);
  };

  PlayerContext.prototype.render_timeline = function () {
    var dpi = window.devicePixelRatio;
    var css_size = window.getComputedStyle(this.timeline_canvas);
    var css_width = parseFloat(css_size.width);
    var css_height = parseFloat(css_size.height);
    var pixel_width = Math.floor(css_width * dpi);
    var pixel_height = Math.floor(css_height * dpi);
    this.timeline_canvas.width = pixel_width;
    this.timeline_canvas.height = pixel_height;
    var draw_ctx = this.timeline_canvas.getContext("2d");
    draw_ctx.strokeStyle = "transparent";
    var csi = this.current_segment_index();

    for (var i = 0; i < pixel_width; i++) {
      var seg_l = Math.floor(i / pixel_width * this.segment_amplitudes.length);
      var seg_r = Math.floor((i + 1) / pixel_width * this.segment_amplitudes.length);

      if (seg_l >= seg_r) {
        seg_r = seg_l + 1;
      }

      if (seg_r > this.segment_amplitudes.length) {
        seg_r = this.segment_amplitudes.length;
      }

      if (seg_l >= this.segment_amplitudes.length) {
        seg_l = this.segment_amplitudes.length - 1;
      }

      var visited = false;

      if (csi >= seg_l && csi < seg_r) {
        draw_ctx.fillStyle = "red";
      } else {
        var max_amp = -Infinity;

        for (var s = seg_l; s < seg_r; s++) {
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
  };

  PlayerContext.prototype.color_ramp = function (amplitude) {
    if (amplitude > 1) {
      amplitude = 1;
    }

    var grey_level = Math.round(amplitude * 255);
    return "rgb(0, " + grey_level + ", " + (255 - grey_level) + ")";
  };

  PlayerContext.prototype.update = function () {
    if (!this.timeline_canvas || !this.video_element) {
      return;
    }

    this.render_timeline();
    var segi = this.current_segment_index();

    if (!this.video_element.paused && this.should_ffs[segi] && !this.visited[segi]) {
      this.video_element.playbackRate = this.ff_rate;
    } else {
      this.video_element.playbackRate = this.normal_rate;
    }

    if (!this.video_element.paused) {
      this.visited[segi] = true;
    }
  };

  PlayerContext.prototype.timeline_canvas_mousedown = function (evt) {
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
  };

  PlayerContext.prototype.timeline_canvas_mouseup = function (evt) {
    window.removeEventListener("mouseup", this.timeline_canvas_mouseup);
    window.removeEventListener("mousemove", this.timeline_canvas_mousemove);
    document.body.style.cursor = "";
    this.video_element.style.pointerEvents = "";

    if (!this.paused_before_mouse_down) {
      this.video_element.play();
    }
  };

  PlayerContext.prototype.timeline_canvas_mousemove = function (evt) {
    var rect = this.timeline_canvas.getBoundingClientRect();
    var dx = evt.clientX - rect.left;
    var w = rect.width;
    this.video_element.currentTime = this.video_element.duration * (dx / w);
  };

  return PlayerContext;
}();

function onready(evt) {
  if (document.readyState == "complete") {
    document.removeEventListener("readystatechange", onready);
    var player_container = document.createElement("div");
    player_container.classList.add("player");
    document.body.appendChild(player_container);
    var player = new PlayerContext(player_container);
    init_drop_handler(player);
  }
}

document.addEventListener("readystatechange", onready);
onready(null);

function init_drop_handler(player) {
  var drop_indicator = document.createElement("div");
  drop_indicator.classList.add("drop-indicator");
  drop_indicator.innerHTML = "<div class=\"inner\">Release to play&hellip;</div>";

  function drop_done(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    drop_indicator.remove();
  }

  document.body.addEventListener("drop", function (evt) {
    var _a;

    drop_done(evt);
    var file = (_a = evt.dataTransfer) === null || _a === void 0 ? void 0 : _a.files[0];
    player.handle_file(file);
  });
  document.body.addEventListener("dragenter", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    document.body.appendChild(drop_indicator);
  });
  document.body.addEventListener("dragleave", drop_done);
  document.body.addEventListener("dragend", drop_done);

  for (var _i = 0, _a = ["dragstart", "dragover", "drag", "drop"]; _i < _a.length; _i++) {
    var evt = _a[_i];
    document.addEventListener(evt, function (evt) {
      return evt.preventDefault();
    });
  }
}
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "172.17.0.3" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38387" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","entry.ts"], null)
//# sourceMappingURL=/entry.26f2623c.js.map