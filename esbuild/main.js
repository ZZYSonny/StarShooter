(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/mupdf-js/dist/libmupdf.js
  var require_libmupdf = __commonJS({
    "node_modules/mupdf-js/dist/libmupdf.js"(exports, module) {
      var mupdf = function() {
        var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
        if (typeof __filename !== "undefined")
          _scriptDir = _scriptDir || __filename;
        return function(mupdf2) {
          mupdf2 = mupdf2 || {};
          var Module = typeof mupdf2 !== "undefined" ? mupdf2 : {};
          var readyPromiseResolve, readyPromiseReject;
          Module["ready"] = new Promise(function(resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
          });
          Module.noExitRuntime = true;
          Module.noInitialRun = true;
          Module.locateFile = function(path, prefix) {
            if (ENVIRONMENT_IS_NODE) {
              return prefix + path;
            }
            return path;
          };
          Module.onRuntimeInitialized = function() {
            Module.ccall("initContext");
            mupdf2.openDocument = Module.cwrap("openDocument", "number", ["string"]);
            mupdf2.freeDocument = Module.cwrap("freeDocument", "null", ["number"]);
            mupdf2.documentTitle = Module.cwrap("documentTitle", "string", ["number"]);
            mupdf2.countPages = Module.cwrap("countPages", "number", ["number"]);
            mupdf2.pageWidth = Module.cwrap("pageWidth", "number", ["number", "number", "number"]);
            mupdf2.pageHeight = Module.cwrap("pageHeight", "number", ["number", "number", "number"]);
            mupdf2.pageLinks = Module.cwrap("pageLinks", "string", ["number", "number", "number"]);
            mupdf2.drawPageAsPNG = Module.cwrap("drawPageAsPNG", "string", ["number", "number", "number"]);
            mupdf2.drawPageAsHTML = Module.cwrap("drawPageAsHTML", "string", ["number", "number"]);
            mupdf2.drawPageAsSVG = Module.cwrap("drawPageAsSVG", "string", ["number", "number"]);
            mupdf2.loadOutline = Module.cwrap("loadOutline", "number", ["number"]);
            mupdf2.freeOutline = Module.cwrap("freeOutline", null, ["number"]);
            mupdf2.outlineTitle = Module.cwrap("outlineTitle", "string", ["number"]);
            mupdf2.outlinePage = Module.cwrap("outlinePage", "number", ["number"]);
            mupdf2.outlineDown = Module.cwrap("outlineDown", "number", ["number"]);
            mupdf2.outlineNext = Module.cwrap("outlineNext", "number", ["number"]);
          };
          mupdf2.documentOutline = function(doc) {
            function makeOutline(node) {
              var ul2 = document.createElement("ul");
              while (node) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.href = "#page" + mupdf2.outlinePage(node);
                a.textContent = mupdf2.outlineTitle(node);
                li.appendChild(a);
                var down = mupdf2.outlineDown(node);
                if (down) {
                  li.appendChild(makeOutline(down));
                }
                ul2.appendChild(li);
                node = mupdf2.outlineNext(node);
              }
              return ul2;
            }
            var root = mupdf2.loadOutline(doc);
            if (root) {
              var ul = makeOutline(root);
              mupdf2.freeOutline(root);
              return ul;
            }
            return null;
          };
          var moduleOverrides = {};
          var key;
          for (key in Module) {
            if (Module.hasOwnProperty(key)) {
              moduleOverrides[key] = Module[key];
            }
          }
          var arguments_ = [];
          var thisProgram = "./this.program";
          var quit_ = function(status, toThrow) {
            throw toThrow;
          };
          var ENVIRONMENT_IS_WEB = false;
          var ENVIRONMENT_IS_WORKER = false;
          var ENVIRONMENT_IS_NODE = false;
          var ENVIRONMENT_IS_SHELL = false;
          ENVIRONMENT_IS_WEB = typeof window === "object";
          ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
          ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
          ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
          var scriptDirectory = "";
          function locateFile(path) {
            if (Module["locateFile"]) {
              return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
          }
          var read_, readAsync, readBinary, setWindowTitle;
          var nodeFS;
          var nodePath;
          if (ENVIRONMENT_IS_NODE) {
            if (ENVIRONMENT_IS_WORKER) {
              scriptDirectory = __require("path").dirname(scriptDirectory) + "/";
            } else {
              scriptDirectory = __dirname + "/";
            }
            read_ = function shell_read(filename, binary) {
              if (!nodeFS)
                nodeFS = __require("fs");
              if (!nodePath)
                nodePath = __require("path");
              filename = nodePath["normalize"](filename);
              return nodeFS["readFileSync"](filename, binary ? null : "utf8");
            };
            readBinary = function readBinary2(filename) {
              var ret = read_(filename, true);
              if (!ret.buffer) {
                ret = new Uint8Array(ret);
              }
              assert(ret.buffer);
              return ret;
            };
            if (process["argv"].length > 1) {
              thisProgram = process["argv"][1].replace(/\\/g, "/");
            }
            arguments_ = process["argv"].slice(2);
            process["on"]("uncaughtException", function(ex) {
              if (!(ex instanceof ExitStatus)) {
                throw ex;
              }
            });
            process["on"]("unhandledRejection", abort);
            quit_ = function(status) {
              process["exit"](status);
            };
            Module["inspect"] = function() {
              return "[Emscripten Module object]";
            };
          } else if (ENVIRONMENT_IS_SHELL) {
            if (typeof read != "undefined") {
              read_ = function shell_read(f) {
                return read(f);
              };
            }
            readBinary = function readBinary2(f) {
              var data;
              if (typeof readbuffer === "function") {
                return new Uint8Array(readbuffer(f));
              }
              data = read(f, "binary");
              assert(typeof data === "object");
              return data;
            };
            if (typeof scriptArgs != "undefined") {
              arguments_ = scriptArgs;
            } else if (typeof arguments != "undefined") {
              arguments_ = arguments;
            }
            if (typeof quit === "function") {
              quit_ = function(status) {
                quit(status);
              };
            }
            if (typeof print !== "undefined") {
              if (typeof console === "undefined")
                console = {};
              console.log = print;
              console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
            }
          } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
              scriptDirectory = self.location.href;
            } else if (document.currentScript) {
              scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
              scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
              scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
            } else {
              scriptDirectory = "";
            }
            {
              read_ = function shell_read(url) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.send(null);
                return xhr.responseText;
              };
              if (ENVIRONMENT_IS_WORKER) {
                readBinary = function readBinary2(url) {
                  var xhr = new XMLHttpRequest();
                  xhr.open("GET", url, false);
                  xhr.responseType = "arraybuffer";
                  xhr.send(null);
                  return new Uint8Array(xhr.response);
                };
              }
              readAsync = function readAsync2(url, onload, onerror) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function xhr_onload() {
                  if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                  }
                  onerror();
                };
                xhr.onerror = onerror;
                xhr.send(null);
              };
            }
            setWindowTitle = function(title) {
              document.title = title;
            };
          } else {
          }
          var out = Module["print"] || console.log.bind(console);
          var err = Module["printErr"] || console.warn.bind(console);
          for (key in moduleOverrides) {
            if (moduleOverrides.hasOwnProperty(key)) {
              Module[key] = moduleOverrides[key];
            }
          }
          moduleOverrides = null;
          if (Module["arguments"])
            arguments_ = Module["arguments"];
          if (Module["thisProgram"])
            thisProgram = Module["thisProgram"];
          if (Module["quit"])
            quit_ = Module["quit"];
          var tempRet0 = 0;
          var setTempRet0 = function(value) {
            tempRet0 = value;
          };
          var getTempRet0 = function() {
            return tempRet0;
          };
          var wasmBinary;
          if (Module["wasmBinary"])
            wasmBinary = Module["wasmBinary"];
          var noExitRuntime;
          if (Module["noExitRuntime"])
            noExitRuntime = Module["noExitRuntime"];
          if (typeof WebAssembly !== "object") {
            err("no native wasm support detected");
          }
          var wasmMemory;
          var wasmTable = new WebAssembly.Table({ "initial": 2796, "maximum": 2796 + 0, "element": "anyfunc" });
          var ABORT = false;
          var EXITSTATUS = 0;
          function assert(condition, text) {
            if (!condition) {
              abort("Assertion failed: " + text);
            }
          }
          function getCFunc(ident) {
            var func = Module["_" + ident];
            assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
            return func;
          }
          function ccall(ident, returnType, argTypes, args, opts) {
            var toC = { "string": function(str) {
              var ret2 = 0;
              if (str !== null && str !== void 0 && str !== 0) {
                var len = (str.length << 2) + 1;
                ret2 = stackAlloc(len);
                stringToUTF8(str, ret2, len);
              }
              return ret2;
            }, "array": function(arr) {
              var ret2 = stackAlloc(arr.length);
              writeArrayToMemory(arr, ret2);
              return ret2;
            } };
            function convertReturnValue(ret2) {
              if (returnType === "string")
                return UTF8ToString(ret2);
              if (returnType === "boolean")
                return Boolean(ret2);
              return ret2;
            }
            var func = getCFunc(ident);
            var cArgs = [];
            var stack = 0;
            if (args) {
              for (var i = 0; i < args.length; i++) {
                var converter = toC[argTypes[i]];
                if (converter) {
                  if (stack === 0)
                    stack = stackSave();
                  cArgs[i] = converter(args[i]);
                } else {
                  cArgs[i] = args[i];
                }
              }
            }
            var ret = func.apply(null, cArgs);
            ret = convertReturnValue(ret);
            if (stack !== 0)
              stackRestore(stack);
            return ret;
          }
          function cwrap(ident, returnType, argTypes, opts) {
            argTypes = argTypes || [];
            var numericArgs = argTypes.every(function(type) {
              return type === "number";
            });
            var numericRet = returnType !== "string";
            if (numericRet && numericArgs && !opts) {
              return getCFunc(ident);
            }
            return function() {
              return ccall(ident, returnType, argTypes, arguments, opts);
            };
          }
          var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
          function UTF8ArrayToString(heap, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var endPtr = idx;
            while (heap[endPtr] && !(endPtr >= endIdx))
              ++endPtr;
            if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
              return UTF8Decoder.decode(heap.subarray(idx, endPtr));
            } else {
              var str = "";
              while (idx < endPtr) {
                var u0 = heap[idx++];
                if (!(u0 & 128)) {
                  str += String.fromCharCode(u0);
                  continue;
                }
                var u1 = heap[idx++] & 63;
                if ((u0 & 224) == 192) {
                  str += String.fromCharCode((u0 & 31) << 6 | u1);
                  continue;
                }
                var u2 = heap[idx++] & 63;
                if ((u0 & 240) == 224) {
                  u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                } else {
                  u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
                }
                if (u0 < 65536) {
                  str += String.fromCharCode(u0);
                } else {
                  var ch = u0 - 65536;
                  str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                }
              }
            }
            return str;
          }
          function UTF8ToString(ptr, maxBytesToRead) {
            return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
          }
          function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0))
              return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for (var i = 0; i < str.length; ++i) {
              var u = str.charCodeAt(i);
              if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
              }
              if (u <= 127) {
                if (outIdx >= endIdx)
                  break;
                heap[outIdx++] = u;
              } else if (u <= 2047) {
                if (outIdx + 1 >= endIdx)
                  break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63;
              } else if (u <= 65535) {
                if (outIdx + 2 >= endIdx)
                  break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
              } else {
                if (outIdx + 3 >= endIdx)
                  break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
              }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx;
          }
          function stringToUTF8(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
          }
          function lengthBytesUTF8(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
              var u = str.charCodeAt(i);
              if (u >= 55296 && u <= 57343)
                u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
              if (u <= 127)
                ++len;
              else if (u <= 2047)
                len += 2;
              else if (u <= 65535)
                len += 3;
              else
                len += 4;
            }
            return len;
          }
          function writeArrayToMemory(array, buffer2) {
            HEAP8.set(array, buffer2);
          }
          function writeAsciiToMemory(str, buffer2, dontAddNull) {
            for (var i = 0; i < str.length; ++i) {
              HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
            }
            if (!dontAddNull)
              HEAP8[buffer2 >> 0] = 0;
          }
          var WASM_PAGE_SIZE = 65536;
          function alignUp(x, multiple) {
            if (x % multiple > 0) {
              x += multiple - x % multiple;
            }
            return x;
          }
          var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
          function updateGlobalBufferAndViews(buf) {
            buffer = buf;
            Module["HEAP8"] = HEAP8 = new Int8Array(buf);
            Module["HEAP16"] = HEAP16 = new Int16Array(buf);
            Module["HEAP32"] = HEAP32 = new Int32Array(buf);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
          }
          var DYNAMIC_BASE = 7347840, DYNAMICTOP_PTR = 2104800;
          var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 786432e3;
          if (Module["wasmMemory"]) {
            wasmMemory = Module["wasmMemory"];
          } else {
            wasmMemory = new WebAssembly.Memory({ "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE, "maximum": 2147483648 / WASM_PAGE_SIZE });
          }
          if (wasmMemory) {
            buffer = wasmMemory.buffer;
          }
          INITIAL_INITIAL_MEMORY = buffer.byteLength;
          updateGlobalBufferAndViews(buffer);
          HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
          function callRuntimeCallbacks(callbacks) {
            while (callbacks.length > 0) {
              var callback = callbacks.shift();
              if (typeof callback == "function") {
                callback(Module);
                continue;
              }
              var func = callback.func;
              if (typeof func === "number") {
                if (callback.arg === void 0) {
                  Module["dynCall_v"](func);
                } else {
                  Module["dynCall_vi"](func, callback.arg);
                }
              } else {
                func(callback.arg === void 0 ? null : callback.arg);
              }
            }
          }
          var __ATPRERUN__ = [];
          var __ATINIT__ = [];
          var __ATMAIN__ = [];
          var __ATPOSTRUN__ = [];
          var runtimeInitialized = false;
          var runtimeExited = false;
          function preRun() {
            if (Module["preRun"]) {
              if (typeof Module["preRun"] == "function")
                Module["preRun"] = [Module["preRun"]];
              while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
              }
            }
            callRuntimeCallbacks(__ATPRERUN__);
          }
          function initRuntime() {
            runtimeInitialized = true;
            if (!Module["noFSInit"] && !FS.init.initialized)
              FS.init();
            TTY.init();
            callRuntimeCallbacks(__ATINIT__);
          }
          function preMain() {
            FS.ignorePermissions = false;
            callRuntimeCallbacks(__ATMAIN__);
          }
          function exitRuntime() {
            runtimeExited = true;
          }
          function postRun() {
            if (Module["postRun"]) {
              if (typeof Module["postRun"] == "function")
                Module["postRun"] = [Module["postRun"]];
              while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
              }
            }
            callRuntimeCallbacks(__ATPOSTRUN__);
          }
          function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb);
          }
          function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
          }
          var Math_abs = Math.abs;
          var Math_ceil = Math.ceil;
          var Math_floor = Math.floor;
          var Math_min = Math.min;
          var runDependencies = 0;
          var runDependencyWatcher = null;
          var dependenciesFulfilled = null;
          function getUniqueRunDependency(id) {
            return id;
          }
          function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
              Module["monitorRunDependencies"](runDependencies);
            }
          }
          function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
              Module["monitorRunDependencies"](runDependencies);
            }
            if (runDependencies == 0) {
              if (runDependencyWatcher !== null) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
              }
              if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
              }
            }
          }
          Module["preloadedImages"] = {};
          Module["preloadedAudios"] = {};
          function abort(what) {
            if (Module["onAbort"]) {
              Module["onAbort"](what);
            }
            what += "";
            out(what);
            err(what);
            ABORT = true;
            EXITSTATUS = 1;
            what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
            throw new WebAssembly.RuntimeError(what);
          }
          function hasPrefix(str, prefix) {
            return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
          }
          var dataURIPrefix = "data:application/octet-stream;base64,";
          function isDataURI(filename) {
            return hasPrefix(filename, dataURIPrefix);
          }
          var fileURIPrefix = "file://";
          function isFileURI(filename) {
            return hasPrefix(filename, fileURIPrefix);
          }
          var wasmBinaryFile = "libmupdf.wasm";
          if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
          }
          function getBinary() {
            try {
              if (wasmBinary) {
                return new Uint8Array(wasmBinary);
              }
              if (readBinary) {
                return readBinary(wasmBinaryFile);
              } else {
                throw "both async and sync fetching of the wasm failed";
              }
            } catch (err2) {
              abort(err2);
            }
          }
          function getBinaryPromise() {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
              return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                if (!response["ok"]) {
                  throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                }
                return response["arrayBuffer"]();
              }).catch(function() {
                return getBinary();
              });
            }
            return new Promise(function(resolve, reject) {
              resolve(getBinary());
            });
          }
          function createWasm() {
            var info = { "a": asmLibraryArg };
            function receiveInstance(instance, module2) {
              var exports3 = instance.exports;
              Module["asm"] = exports3;
              removeRunDependency("wasm-instantiate");
            }
            addRunDependency("wasm-instantiate");
            function receiveInstantiatedSource(output) {
              receiveInstance(output["instance"]);
            }
            function instantiateArrayBuffer(receiver) {
              return getBinaryPromise().then(function(binary) {
                return WebAssembly.instantiate(binary, info);
              }).then(receiver, function(reason) {
                err("failed to asynchronously prepare wasm: " + reason);
                abort(reason);
              });
            }
            function instantiateAsync() {
              if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
                fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
                  var result = WebAssembly.instantiateStreaming(response, info);
                  return result.then(receiveInstantiatedSource, function(reason) {
                    err("wasm streaming compile failed: " + reason);
                    err("falling back to ArrayBuffer instantiation");
                    return instantiateArrayBuffer(receiveInstantiatedSource);
                  });
                });
              } else {
                return instantiateArrayBuffer(receiveInstantiatedSource);
              }
            }
            if (Module["instantiateWasm"]) {
              try {
                var exports2 = Module["instantiateWasm"](info, receiveInstance);
                return exports2;
              } catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                return false;
              }
            }
            instantiateAsync();
            return {};
          }
          var tempDouble;
          var tempI64;
          __ATINIT__.push({ func: function() {
            ___wasm_call_ctors();
          } });
          function demangle(func) {
            return func;
          }
          function demangleAll(text) {
            var regex = /\b_Z[\w\d_]+/g;
            return text.replace(regex, function(x) {
              var y = demangle(x);
              return x === y ? x : y + " [" + x + "]";
            });
          }
          function jsStackTrace() {
            var err2 = new Error();
            if (!err2.stack) {
              try {
                throw new Error();
              } catch (e) {
                err2 = e;
              }
              if (!err2.stack) {
                return "(no stack trace available)";
              }
            }
            return err2.stack.toString();
          }
          function stackTrace() {
            var js = jsStackTrace();
            if (Module["extraStackTrace"])
              js += "\n" + Module["extraStackTrace"]();
            return demangleAll(js);
          }
          function setErrNo(value) {
            HEAP32[___errno_location() >> 2] = value;
            return value;
          }
          var PATH = { splitPath: function(filename) {
            var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            return splitPathRe.exec(filename).slice(1);
          }, normalizeArray: function(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up; up--) {
                parts.unshift("..");
              }
            }
            return parts;
          }, normalize: function(path) {
            var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
            path = PATH.normalizeArray(path.split("/").filter(function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          }, dirname: function(path) {
            var result = PATH.splitPath(path), root = result[0], dir = result[1];
            if (!root && !dir) {
              return ".";
            }
            if (dir) {
              dir = dir.substr(0, dir.length - 1);
            }
            return root + dir;
          }, basename: function(path) {
            if (path === "/")
              return "/";
            var lastSlash = path.lastIndexOf("/");
            if (lastSlash === -1)
              return path;
            return path.substr(lastSlash + 1);
          }, extname: function(path) {
            return PATH.splitPath(path)[3];
          }, join: function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return PATH.normalize(paths.join("/"));
          }, join2: function(l, r) {
            return PATH.normalize(l + "/" + r);
          } };
          var PATH_FS = { resolve: function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : FS.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                return "";
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          }, relative: function(from, to) {
            from = PATH_FS.resolve(from).substr(1);
            to = PATH_FS.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "")
                  break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "")
                  break;
              }
              if (start > end)
                return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          } };
          var TTY = { ttys: [], init: function() {
          }, shutdown: function() {
          }, register: function(dev, ops) {
            TTY.ttys[dev] = { input: [], output: [], ops };
            FS.registerDevice(dev, TTY.stream_ops);
          }, stream_ops: { open: function(stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
              throw new FS.ErrnoError(43);
            }
            stream.tty = tty;
            stream.seekable = false;
          }, close: function(stream) {
            stream.tty.ops.flush(stream.tty);
          }, flush: function(stream) {
            stream.tty.ops.flush(stream.tty);
          }, read: function(stream, buffer2, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
              throw new FS.ErrnoError(60);
            }
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = stream.tty.ops.get_char(stream.tty);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0)
                break;
              bytesRead++;
              buffer2[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          }, write: function(stream, buffer2, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
              throw new FS.ErrnoError(60);
            }
            try {
              for (var i = 0; i < length; i++) {
                stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
              }
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          } }, default_tty_ops: { get_char: function(tty) {
            if (!tty.input.length) {
              var result = null;
              if (ENVIRONMENT_IS_NODE) {
                var BUFSIZE = 256;
                var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
                var bytesRead = 0;
                try {
                  bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
                } catch (e) {
                  if (e.toString().indexOf("EOF") != -1)
                    bytesRead = 0;
                  else
                    throw e;
                }
                if (bytesRead > 0) {
                  result = buf.slice(0, bytesRead).toString("utf-8");
                } else {
                  result = null;
                }
              } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                result = window.prompt("Input: ");
                if (result !== null) {
                  result += "\n";
                }
              } else if (typeof readline == "function") {
                result = readline();
                if (result !== null) {
                  result += "\n";
                }
              }
              if (!result) {
                return null;
              }
              tty.input = intArrayFromString(result, true);
            }
            return tty.input.shift();
          }, put_char: function(tty, val) {
            if (val === null || val === 10) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0)
                tty.output.push(val);
            }
          }, flush: function(tty) {
            if (tty.output && tty.output.length > 0) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          } }, default_tty1_ops: { put_char: function(tty, val) {
            if (val === null || val === 10) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0)
                tty.output.push(val);
            }
          }, flush: function(tty) {
            if (tty.output && tty.output.length > 0) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          } } };
          var MEMFS = { ops_table: null, mount: function(mount) {
            return MEMFS.createNode(null, "/", 16384 | 511, 0);
          }, createNode: function(parent, name, mode, dev) {
            if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
              throw new FS.ErrnoError(63);
            }
            if (!MEMFS.ops_table) {
              MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
            }
            var node = FS.createNode(parent, name, mode, dev);
            if (FS.isDir(node.mode)) {
              node.node_ops = MEMFS.ops_table.dir.node;
              node.stream_ops = MEMFS.ops_table.dir.stream;
              node.contents = {};
            } else if (FS.isFile(node.mode)) {
              node.node_ops = MEMFS.ops_table.file.node;
              node.stream_ops = MEMFS.ops_table.file.stream;
              node.usedBytes = 0;
              node.contents = null;
            } else if (FS.isLink(node.mode)) {
              node.node_ops = MEMFS.ops_table.link.node;
              node.stream_ops = MEMFS.ops_table.link.stream;
            } else if (FS.isChrdev(node.mode)) {
              node.node_ops = MEMFS.ops_table.chrdev.node;
              node.stream_ops = MEMFS.ops_table.chrdev.stream;
            }
            node.timestamp = Date.now();
            if (parent) {
              parent.contents[name] = node;
            }
            return node;
          }, getFileDataAsRegularArray: function(node) {
            if (node.contents && node.contents.subarray) {
              var arr = [];
              for (var i = 0; i < node.usedBytes; ++i)
                arr.push(node.contents[i]);
              return arr;
            }
            return node.contents;
          }, getFileDataAsTypedArray: function(node) {
            if (!node.contents)
              return new Uint8Array(0);
            if (node.contents.subarray)
              return node.contents.subarray(0, node.usedBytes);
            return new Uint8Array(node.contents);
          }, expandFileStorage: function(node, newCapacity) {
            var prevCapacity = node.contents ? node.contents.length : 0;
            if (prevCapacity >= newCapacity)
              return;
            var CAPACITY_DOUBLING_MAX = 1024 * 1024;
            newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
            if (prevCapacity != 0)
              newCapacity = Math.max(newCapacity, 256);
            var oldContents = node.contents;
            node.contents = new Uint8Array(newCapacity);
            if (node.usedBytes > 0)
              node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
            return;
          }, resizeFileStorage: function(node, newSize) {
            if (node.usedBytes == newSize)
              return;
            if (newSize == 0) {
              node.contents = null;
              node.usedBytes = 0;
              return;
            }
            if (!node.contents || node.contents.subarray) {
              var oldContents = node.contents;
              node.contents = new Uint8Array(newSize);
              if (oldContents) {
                node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
              }
              node.usedBytes = newSize;
              return;
            }
            if (!node.contents)
              node.contents = [];
            if (node.contents.length > newSize)
              node.contents.length = newSize;
            else
              while (node.contents.length < newSize)
                node.contents.push(0);
            node.usedBytes = newSize;
          }, node_ops: { getattr: function(node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
              attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
              attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
              attr.size = node.link.length;
            } else {
              attr.size = 0;
            }
            attr.atime = new Date(node.timestamp);
            attr.mtime = new Date(node.timestamp);
            attr.ctime = new Date(node.timestamp);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
          }, setattr: function(node, attr) {
            if (attr.mode !== void 0) {
              node.mode = attr.mode;
            }
            if (attr.timestamp !== void 0) {
              node.timestamp = attr.timestamp;
            }
            if (attr.size !== void 0) {
              MEMFS.resizeFileStorage(node, attr.size);
            }
          }, lookup: function(parent, name) {
            throw FS.genericErrors[44];
          }, mknod: function(parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
          }, rename: function(old_node, new_dir, new_name) {
            if (FS.isDir(old_node.mode)) {
              var new_node;
              try {
                new_node = FS.lookupNode(new_dir, new_name);
              } catch (e) {
              }
              if (new_node) {
                for (var i in new_node.contents) {
                  throw new FS.ErrnoError(55);
                }
              }
            }
            delete old_node.parent.contents[old_node.name];
            old_node.name = new_name;
            new_dir.contents[new_name] = old_node;
            old_node.parent = new_dir;
          }, unlink: function(parent, name) {
            delete parent.contents[name];
          }, rmdir: function(parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i in node.contents) {
              throw new FS.ErrnoError(55);
            }
            delete parent.contents[name];
          }, readdir: function(node) {
            var entries = [".", ".."];
            for (var key2 in node.contents) {
              if (!node.contents.hasOwnProperty(key2)) {
                continue;
              }
              entries.push(key2);
            }
            return entries;
          }, symlink: function(parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node;
          }, readlink: function(node) {
            if (!FS.isLink(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            return node.link;
          } }, stream_ops: { read: function(stream, buffer2, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes)
              return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            if (size > 8 && contents.subarray) {
              buffer2.set(contents.subarray(position, position + size), offset);
            } else {
              for (var i = 0; i < size; i++)
                buffer2[offset + i] = contents[position + i];
            }
            return size;
          }, write: function(stream, buffer2, offset, length, position, canOwn) {
            if (buffer2.buffer === HEAP8.buffer) {
              canOwn = false;
            }
            if (!length)
              return 0;
            var node = stream.node;
            node.timestamp = Date.now();
            if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
              if (canOwn) {
                node.contents = buffer2.subarray(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (node.usedBytes === 0 && position === 0) {
                node.contents = buffer2.slice(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (position + length <= node.usedBytes) {
                node.contents.set(buffer2.subarray(offset, offset + length), position);
                return length;
              }
            }
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer2.subarray)
              node.contents.set(buffer2.subarray(offset, offset + length), position);
            else {
              for (var i = 0; i < length; i++) {
                node.contents[position + i] = buffer2[offset + i];
              }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length;
          }, llseek: function(stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
              position += stream.position;
            } else if (whence === 2) {
              if (FS.isFile(stream.node.mode)) {
                position += stream.node.usedBytes;
              }
            }
            if (position < 0) {
              throw new FS.ErrnoError(28);
            }
            return position;
          }, allocate: function(stream, offset, length) {
            MEMFS.expandFileStorage(stream.node, offset + length);
            stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
          }, mmap: function(stream, address, length, position, prot, flags) {
            assert(address === 0);
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && contents.buffer === buffer) {
              allocated = false;
              ptr = contents.byteOffset;
            } else {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              allocated = true;
              ptr = _malloc(length);
              if (!ptr) {
                throw new FS.ErrnoError(48);
              }
              HEAP8.set(contents, ptr);
            }
            return { ptr, allocated };
          }, msync: function(stream, buffer2, offset, length, mmapFlags) {
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            if (mmapFlags & 2) {
              return 0;
            }
            var bytesWritten = MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
            return 0;
          } } };
          var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, trackingDelegate: {}, tracking: { openFlags: { READ: 1, WRITE: 2 } }, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, handleFSError: function(e) {
            if (!(e instanceof FS.ErrnoError))
              throw e + " : " + stackTrace();
            return setErrNo(e.errno);
          }, lookupPath: function(path, opts) {
            path = PATH_FS.resolve(FS.cwd(), path);
            opts = opts || {};
            if (!path)
              return { path: "", node: null };
            var defaults = { follow_mount: true, recurse_count: 0 };
            for (var key2 in defaults) {
              if (opts[key2] === void 0) {
                opts[key2] = defaults[key2];
              }
            }
            if (opts.recurse_count > 8) {
              throw new FS.ErrnoError(32);
            }
            var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
              return !!p;
            }), false);
            var current = FS.root;
            var current_path = "/";
            for (var i = 0; i < parts.length; i++) {
              var islast = i === parts.length - 1;
              if (islast && opts.parent) {
                break;
              }
              current = FS.lookupNode(current, parts[i]);
              current_path = PATH.join2(current_path, parts[i]);
              if (FS.isMountpoint(current)) {
                if (!islast || islast && opts.follow_mount) {
                  current = current.mounted.root;
                }
              }
              if (!islast || opts.follow) {
                var count = 0;
                while (FS.isLink(current.mode)) {
                  var link = FS.readlink(current_path);
                  current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                  var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
                  current = lookup.node;
                  if (count++ > 40) {
                    throw new FS.ErrnoError(32);
                  }
                }
              }
            }
            return { path: current_path, node: current };
          }, getPath: function(node) {
            var path;
            while (true) {
              if (FS.isRoot(node)) {
                var mount = node.mount.mountpoint;
                if (!path)
                  return mount;
                return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
              }
              path = path ? node.name + "/" + path : node.name;
              node = node.parent;
            }
          }, hashName: function(parentid, name) {
            var hash = 0;
            for (var i = 0; i < name.length; i++) {
              hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
            }
            return (parentid + hash >>> 0) % FS.nameTable.length;
          }, hashAddNode: function(node) {
            var hash = FS.hashName(node.parent.id, node.name);
            node.name_next = FS.nameTable[hash];
            FS.nameTable[hash] = node;
          }, hashRemoveNode: function(node) {
            var hash = FS.hashName(node.parent.id, node.name);
            if (FS.nameTable[hash] === node) {
              FS.nameTable[hash] = node.name_next;
            } else {
              var current = FS.nameTable[hash];
              while (current) {
                if (current.name_next === node) {
                  current.name_next = node.name_next;
                  break;
                }
                current = current.name_next;
              }
            }
          }, lookupNode: function(parent, name) {
            var errCode = FS.mayLookup(parent);
            if (errCode) {
              throw new FS.ErrnoError(errCode, parent);
            }
            var hash = FS.hashName(parent.id, name);
            for (var node = FS.nameTable[hash]; node; node = node.name_next) {
              var nodeName = node.name;
              if (node.parent.id === parent.id && nodeName === name) {
                return node;
              }
            }
            return FS.lookup(parent, name);
          }, createNode: function(parent, name, mode, rdev) {
            var node = new FS.FSNode(parent, name, mode, rdev);
            FS.hashAddNode(node);
            return node;
          }, destroyNode: function(node) {
            FS.hashRemoveNode(node);
          }, isRoot: function(node) {
            return node === node.parent;
          }, isMountpoint: function(node) {
            return !!node.mounted;
          }, isFile: function(mode) {
            return (mode & 61440) === 32768;
          }, isDir: function(mode) {
            return (mode & 61440) === 16384;
          }, isLink: function(mode) {
            return (mode & 61440) === 40960;
          }, isChrdev: function(mode) {
            return (mode & 61440) === 8192;
          }, isBlkdev: function(mode) {
            return (mode & 61440) === 24576;
          }, isFIFO: function(mode) {
            return (mode & 61440) === 4096;
          }, isSocket: function(mode) {
            return (mode & 49152) === 49152;
          }, flagModes: { "r": 0, "rs": 1052672, "r+": 2, "w": 577, "wx": 705, "xw": 705, "w+": 578, "wx+": 706, "xw+": 706, "a": 1089, "ax": 1217, "xa": 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 }, modeStringToFlags: function(str) {
            var flags = FS.flagModes[str];
            if (typeof flags === "undefined") {
              throw new Error("Unknown file open mode: " + str);
            }
            return flags;
          }, flagsToPermissionString: function(flag) {
            var perms = ["r", "w", "rw"][flag & 3];
            if (flag & 512) {
              perms += "w";
            }
            return perms;
          }, nodePermissions: function(node, perms) {
            if (FS.ignorePermissions) {
              return 0;
            }
            if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
              return 2;
            } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
              return 2;
            } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
              return 2;
            }
            return 0;
          }, mayLookup: function(dir) {
            var errCode = FS.nodePermissions(dir, "x");
            if (errCode)
              return errCode;
            if (!dir.node_ops.lookup)
              return 2;
            return 0;
          }, mayCreate: function(dir, name) {
            try {
              var node = FS.lookupNode(dir, name);
              return 20;
            } catch (e) {
            }
            return FS.nodePermissions(dir, "wx");
          }, mayDelete: function(dir, name, isdir) {
            var node;
            try {
              node = FS.lookupNode(dir, name);
            } catch (e) {
              return e.errno;
            }
            var errCode = FS.nodePermissions(dir, "wx");
            if (errCode) {
              return errCode;
            }
            if (isdir) {
              if (!FS.isDir(node.mode)) {
                return 54;
              }
              if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                return 10;
              }
            } else {
              if (FS.isDir(node.mode)) {
                return 31;
              }
            }
            return 0;
          }, mayOpen: function(node, flags) {
            if (!node) {
              return 44;
            }
            if (FS.isLink(node.mode)) {
              return 32;
            } else if (FS.isDir(node.mode)) {
              if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                return 31;
              }
            }
            return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
          }, MAX_OPEN_FDS: 4096, nextfd: function(fd_start, fd_end) {
            fd_start = fd_start || 0;
            fd_end = fd_end || FS.MAX_OPEN_FDS;
            for (var fd = fd_start; fd <= fd_end; fd++) {
              if (!FS.streams[fd]) {
                return fd;
              }
            }
            throw new FS.ErrnoError(33);
          }, getStream: function(fd) {
            return FS.streams[fd];
          }, createStream: function(stream, fd_start, fd_end) {
            if (!FS.FSStream) {
              FS.FSStream = function() {
              };
              FS.FSStream.prototype = { object: { get: function() {
                return this.node;
              }, set: function(val) {
                this.node = val;
              } }, isRead: { get: function() {
                return (this.flags & 2097155) !== 1;
              } }, isWrite: { get: function() {
                return (this.flags & 2097155) !== 0;
              } }, isAppend: { get: function() {
                return this.flags & 1024;
              } } };
            }
            var newStream = new FS.FSStream();
            for (var p in stream) {
              newStream[p] = stream[p];
            }
            stream = newStream;
            var fd = FS.nextfd(fd_start, fd_end);
            stream.fd = fd;
            FS.streams[fd] = stream;
            return stream;
          }, closeStream: function(fd) {
            FS.streams[fd] = null;
          }, chrdev_stream_ops: { open: function(stream) {
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            if (stream.stream_ops.open) {
              stream.stream_ops.open(stream);
            }
          }, llseek: function() {
            throw new FS.ErrnoError(70);
          } }, major: function(dev) {
            return dev >> 8;
          }, minor: function(dev) {
            return dev & 255;
          }, makedev: function(ma, mi) {
            return ma << 8 | mi;
          }, registerDevice: function(dev, ops) {
            FS.devices[dev] = { stream_ops: ops };
          }, getDevice: function(dev) {
            return FS.devices[dev];
          }, getMounts: function(mount) {
            var mounts = [];
            var check = [mount];
            while (check.length) {
              var m = check.pop();
              mounts.push(m);
              check.push.apply(check, m.mounts);
            }
            return mounts;
          }, syncfs: function(populate, callback) {
            if (typeof populate === "function") {
              callback = populate;
              populate = false;
            }
            FS.syncFSRequests++;
            if (FS.syncFSRequests > 1) {
              err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
            }
            var mounts = FS.getMounts(FS.root.mount);
            var completed = 0;
            function doCallback(errCode) {
              FS.syncFSRequests--;
              return callback(errCode);
            }
            function done(errCode) {
              if (errCode) {
                if (!done.errored) {
                  done.errored = true;
                  return doCallback(errCode);
                }
                return;
              }
              if (++completed >= mounts.length) {
                doCallback(null);
              }
            }
            mounts.forEach(function(mount) {
              if (!mount.type.syncfs) {
                return done(null);
              }
              mount.type.syncfs(mount, populate, done);
            });
          }, mount: function(type, opts, mountpoint) {
            var root = mountpoint === "/";
            var pseudo = !mountpoint;
            var node;
            if (root && FS.root) {
              throw new FS.ErrnoError(10);
            } else if (!root && !pseudo) {
              var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
              mountpoint = lookup.path;
              node = lookup.node;
              if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10);
              }
              if (!FS.isDir(node.mode)) {
                throw new FS.ErrnoError(54);
              }
            }
            var mount = { type, opts, mountpoint, mounts: [] };
            var mountRoot = type.mount(mount);
            mountRoot.mount = mount;
            mount.root = mountRoot;
            if (root) {
              FS.root = mountRoot;
            } else if (node) {
              node.mounted = mount;
              if (node.mount) {
                node.mount.mounts.push(mount);
              }
            }
            return mountRoot;
          }, unmount: function(mountpoint) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            if (!FS.isMountpoint(lookup.node)) {
              throw new FS.ErrnoError(28);
            }
            var node = lookup.node;
            var mount = node.mounted;
            var mounts = FS.getMounts(mount);
            Object.keys(FS.nameTable).forEach(function(hash) {
              var current = FS.nameTable[hash];
              while (current) {
                var next = current.name_next;
                if (mounts.indexOf(current.mount) !== -1) {
                  FS.destroyNode(current);
                }
                current = next;
              }
            });
            node.mounted = null;
            var idx = node.mount.mounts.indexOf(mount);
            node.mount.mounts.splice(idx, 1);
          }, lookup: function(parent, name) {
            return parent.node_ops.lookup(parent, name);
          }, mknod: function(path, mode, dev) {
            var lookup = FS.lookupPath(path, { parent: true });
            var parent = lookup.node;
            var name = PATH.basename(path);
            if (!name || name === "." || name === "..") {
              throw new FS.ErrnoError(28);
            }
            var errCode = FS.mayCreate(parent, name);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            if (!parent.node_ops.mknod) {
              throw new FS.ErrnoError(63);
            }
            return parent.node_ops.mknod(parent, name, mode, dev);
          }, create: function(path, mode) {
            mode = mode !== void 0 ? mode : 438;
            mode &= 4095;
            mode |= 32768;
            return FS.mknod(path, mode, 0);
          }, mkdir: function(path, mode) {
            mode = mode !== void 0 ? mode : 511;
            mode &= 511 | 512;
            mode |= 16384;
            return FS.mknod(path, mode, 0);
          }, mkdirTree: function(path, mode) {
            var dirs = path.split("/");
            var d = "";
            for (var i = 0; i < dirs.length; ++i) {
              if (!dirs[i])
                continue;
              d += "/" + dirs[i];
              try {
                FS.mkdir(d, mode);
              } catch (e) {
                if (e.errno != 20)
                  throw e;
              }
            }
          }, mkdev: function(path, mode, dev) {
            if (typeof dev === "undefined") {
              dev = mode;
              mode = 438;
            }
            mode |= 8192;
            return FS.mknod(path, mode, dev);
          }, symlink: function(oldpath, newpath) {
            if (!PATH_FS.resolve(oldpath)) {
              throw new FS.ErrnoError(44);
            }
            var lookup = FS.lookupPath(newpath, { parent: true });
            var parent = lookup.node;
            if (!parent) {
              throw new FS.ErrnoError(44);
            }
            var newname = PATH.basename(newpath);
            var errCode = FS.mayCreate(parent, newname);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            if (!parent.node_ops.symlink) {
              throw new FS.ErrnoError(63);
            }
            return parent.node_ops.symlink(parent, newname, oldpath);
          }, rename: function(old_path, new_path) {
            var old_dirname = PATH.dirname(old_path);
            var new_dirname = PATH.dirname(new_path);
            var old_name = PATH.basename(old_path);
            var new_name = PATH.basename(new_path);
            var lookup, old_dir, new_dir;
            try {
              lookup = FS.lookupPath(old_path, { parent: true });
              old_dir = lookup.node;
              lookup = FS.lookupPath(new_path, { parent: true });
              new_dir = lookup.node;
            } catch (e) {
              throw new FS.ErrnoError(10);
            }
            if (!old_dir || !new_dir)
              throw new FS.ErrnoError(44);
            if (old_dir.mount !== new_dir.mount) {
              throw new FS.ErrnoError(75);
            }
            var old_node = FS.lookupNode(old_dir, old_name);
            var relative = PATH_FS.relative(old_path, new_dirname);
            if (relative.charAt(0) !== ".") {
              throw new FS.ErrnoError(28);
            }
            relative = PATH_FS.relative(new_path, old_dirname);
            if (relative.charAt(0) !== ".") {
              throw new FS.ErrnoError(55);
            }
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (old_node === new_node) {
              return;
            }
            var isdir = FS.isDir(old_node.mode);
            var errCode = FS.mayDelete(old_dir, old_name, isdir);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            if (!old_dir.node_ops.rename) {
              throw new FS.ErrnoError(63);
            }
            if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
              throw new FS.ErrnoError(10);
            }
            if (new_dir !== old_dir) {
              errCode = FS.nodePermissions(old_dir, "w");
              if (errCode) {
                throw new FS.ErrnoError(errCode);
              }
            }
            try {
              if (FS.trackingDelegate["willMovePath"]) {
                FS.trackingDelegate["willMovePath"](old_path, new_path);
              }
            } catch (e) {
              err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
            }
            FS.hashRemoveNode(old_node);
            try {
              old_dir.node_ops.rename(old_node, new_dir, new_name);
            } catch (e) {
              throw e;
            } finally {
              FS.hashAddNode(old_node);
            }
            try {
              if (FS.trackingDelegate["onMovePath"])
                FS.trackingDelegate["onMovePath"](old_path, new_path);
            } catch (e) {
              err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
            }
          }, rmdir: function(path) {
            var lookup = FS.lookupPath(path, { parent: true });
            var parent = lookup.node;
            var name = PATH.basename(path);
            var node = FS.lookupNode(parent, name);
            var errCode = FS.mayDelete(parent, name, true);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            if (!parent.node_ops.rmdir) {
              throw new FS.ErrnoError(63);
            }
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            try {
              if (FS.trackingDelegate["willDeletePath"]) {
                FS.trackingDelegate["willDeletePath"](path);
              }
            } catch (e) {
              err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
            }
            parent.node_ops.rmdir(parent, name);
            FS.destroyNode(node);
            try {
              if (FS.trackingDelegate["onDeletePath"])
                FS.trackingDelegate["onDeletePath"](path);
            } catch (e) {
              err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
            }
          }, readdir: function(path) {
            var lookup = FS.lookupPath(path, { follow: true });
            var node = lookup.node;
            if (!node.node_ops.readdir) {
              throw new FS.ErrnoError(54);
            }
            return node.node_ops.readdir(node);
          }, unlink: function(path) {
            var lookup = FS.lookupPath(path, { parent: true });
            var parent = lookup.node;
            var name = PATH.basename(path);
            var node = FS.lookupNode(parent, name);
            var errCode = FS.mayDelete(parent, name, false);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            if (!parent.node_ops.unlink) {
              throw new FS.ErrnoError(63);
            }
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            try {
              if (FS.trackingDelegate["willDeletePath"]) {
                FS.trackingDelegate["willDeletePath"](path);
              }
            } catch (e) {
              err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
            }
            parent.node_ops.unlink(parent, name);
            FS.destroyNode(node);
            try {
              if (FS.trackingDelegate["onDeletePath"])
                FS.trackingDelegate["onDeletePath"](path);
            } catch (e) {
              err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
            }
          }, readlink: function(path) {
            var lookup = FS.lookupPath(path);
            var link = lookup.node;
            if (!link) {
              throw new FS.ErrnoError(44);
            }
            if (!link.node_ops.readlink) {
              throw new FS.ErrnoError(28);
            }
            return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
          }, stat: function(path, dontFollow) {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            var node = lookup.node;
            if (!node) {
              throw new FS.ErrnoError(44);
            }
            if (!node.node_ops.getattr) {
              throw new FS.ErrnoError(63);
            }
            return node.node_ops.getattr(node);
          }, lstat: function(path) {
            return FS.stat(path, true);
          }, chmod: function(path, mode, dontFollow) {
            var node;
            if (typeof path === "string") {
              var lookup = FS.lookupPath(path, { follow: !dontFollow });
              node = lookup.node;
            } else {
              node = path;
            }
            if (!node.node_ops.setattr) {
              throw new FS.ErrnoError(63);
            }
            node.node_ops.setattr(node, { mode: mode & 4095 | node.mode & ~4095, timestamp: Date.now() });
          }, lchmod: function(path, mode) {
            FS.chmod(path, mode, true);
          }, fchmod: function(fd, mode) {
            var stream = FS.getStream(fd);
            if (!stream) {
              throw new FS.ErrnoError(8);
            }
            FS.chmod(stream.node, mode);
          }, chown: function(path, uid, gid, dontFollow) {
            var node;
            if (typeof path === "string") {
              var lookup = FS.lookupPath(path, { follow: !dontFollow });
              node = lookup.node;
            } else {
              node = path;
            }
            if (!node.node_ops.setattr) {
              throw new FS.ErrnoError(63);
            }
            node.node_ops.setattr(node, { timestamp: Date.now() });
          }, lchown: function(path, uid, gid) {
            FS.chown(path, uid, gid, true);
          }, fchown: function(fd, uid, gid) {
            var stream = FS.getStream(fd);
            if (!stream) {
              throw new FS.ErrnoError(8);
            }
            FS.chown(stream.node, uid, gid);
          }, truncate: function(path, len) {
            if (len < 0) {
              throw new FS.ErrnoError(28);
            }
            var node;
            if (typeof path === "string") {
              var lookup = FS.lookupPath(path, { follow: true });
              node = lookup.node;
            } else {
              node = path;
            }
            if (!node.node_ops.setattr) {
              throw new FS.ErrnoError(63);
            }
            if (FS.isDir(node.mode)) {
              throw new FS.ErrnoError(31);
            }
            if (!FS.isFile(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            var errCode = FS.nodePermissions(node, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
          }, ftruncate: function(fd, len) {
            var stream = FS.getStream(fd);
            if (!stream) {
              throw new FS.ErrnoError(8);
            }
            if ((stream.flags & 2097155) === 0) {
              throw new FS.ErrnoError(28);
            }
            FS.truncate(stream.node, len);
          }, utime: function(path, atime, mtime) {
            var lookup = FS.lookupPath(path, { follow: true });
            var node = lookup.node;
            node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
          }, open: function(path, flags, mode, fd_start, fd_end) {
            if (path === "") {
              throw new FS.ErrnoError(44);
            }
            flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
            mode = typeof mode === "undefined" ? 438 : mode;
            if (flags & 64) {
              mode = mode & 4095 | 32768;
            } else {
              mode = 0;
            }
            var node;
            if (typeof path === "object") {
              node = path;
            } else {
              path = PATH.normalize(path);
              try {
                var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
                node = lookup.node;
              } catch (e) {
              }
            }
            var created = false;
            if (flags & 64) {
              if (node) {
                if (flags & 128) {
                  throw new FS.ErrnoError(20);
                }
              } else {
                node = FS.mknod(path, mode, 0);
                created = true;
              }
            }
            if (!node) {
              throw new FS.ErrnoError(44);
            }
            if (FS.isChrdev(node.mode)) {
              flags &= ~512;
            }
            if (flags & 65536 && !FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
            if (!created) {
              var errCode = FS.mayOpen(node, flags);
              if (errCode) {
                throw new FS.ErrnoError(errCode);
              }
            }
            if (flags & 512) {
              FS.truncate(node, 0);
            }
            flags &= ~(128 | 512 | 131072);
            var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false }, fd_start, fd_end);
            if (stream.stream_ops.open) {
              stream.stream_ops.open(stream);
            }
            if (Module["logReadFiles"] && !(flags & 1)) {
              if (!FS.readFiles)
                FS.readFiles = {};
              if (!(path in FS.readFiles)) {
                FS.readFiles[path] = 1;
                err("FS.trackingDelegate error on read file: " + path);
              }
            }
            try {
              if (FS.trackingDelegate["onOpenFile"]) {
                var trackingFlags = 0;
                if ((flags & 2097155) !== 1) {
                  trackingFlags |= FS.tracking.openFlags.READ;
                }
                if ((flags & 2097155) !== 0) {
                  trackingFlags |= FS.tracking.openFlags.WRITE;
                }
                FS.trackingDelegate["onOpenFile"](path, trackingFlags);
              }
            } catch (e) {
              err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
            }
            return stream;
          }, close: function(stream) {
            if (FS.isClosed(stream)) {
              throw new FS.ErrnoError(8);
            }
            if (stream.getdents)
              stream.getdents = null;
            try {
              if (stream.stream_ops.close) {
                stream.stream_ops.close(stream);
              }
            } catch (e) {
              throw e;
            } finally {
              FS.closeStream(stream.fd);
            }
            stream.fd = null;
          }, isClosed: function(stream) {
            return stream.fd === null;
          }, llseek: function(stream, offset, whence) {
            if (FS.isClosed(stream)) {
              throw new FS.ErrnoError(8);
            }
            if (!stream.seekable || !stream.stream_ops.llseek) {
              throw new FS.ErrnoError(70);
            }
            if (whence != 0 && whence != 1 && whence != 2) {
              throw new FS.ErrnoError(28);
            }
            stream.position = stream.stream_ops.llseek(stream, offset, whence);
            stream.ungotten = [];
            return stream.position;
          }, read: function(stream, buffer2, offset, length, position) {
            if (length < 0 || position < 0) {
              throw new FS.ErrnoError(28);
            }
            if (FS.isClosed(stream)) {
              throw new FS.ErrnoError(8);
            }
            if ((stream.flags & 2097155) === 1) {
              throw new FS.ErrnoError(8);
            }
            if (FS.isDir(stream.node.mode)) {
              throw new FS.ErrnoError(31);
            }
            if (!stream.stream_ops.read) {
              throw new FS.ErrnoError(28);
            }
            var seeking = typeof position !== "undefined";
            if (!seeking) {
              position = stream.position;
            } else if (!stream.seekable) {
              throw new FS.ErrnoError(70);
            }
            var bytesRead = stream.stream_ops.read(stream, buffer2, offset, length, position);
            if (!seeking)
              stream.position += bytesRead;
            return bytesRead;
          }, write: function(stream, buffer2, offset, length, position, canOwn) {
            if (length < 0 || position < 0) {
              throw new FS.ErrnoError(28);
            }
            if (FS.isClosed(stream)) {
              throw new FS.ErrnoError(8);
            }
            if ((stream.flags & 2097155) === 0) {
              throw new FS.ErrnoError(8);
            }
            if (FS.isDir(stream.node.mode)) {
              throw new FS.ErrnoError(31);
            }
            if (!stream.stream_ops.write) {
              throw new FS.ErrnoError(28);
            }
            if (stream.seekable && stream.flags & 1024) {
              FS.llseek(stream, 0, 2);
            }
            var seeking = typeof position !== "undefined";
            if (!seeking) {
              position = stream.position;
            } else if (!stream.seekable) {
              throw new FS.ErrnoError(70);
            }
            var bytesWritten = stream.stream_ops.write(stream, buffer2, offset, length, position, canOwn);
            if (!seeking)
              stream.position += bytesWritten;
            try {
              if (stream.path && FS.trackingDelegate["onWriteToFile"])
                FS.trackingDelegate["onWriteToFile"](stream.path);
            } catch (e) {
              err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
            }
            return bytesWritten;
          }, allocate: function(stream, offset, length) {
            if (FS.isClosed(stream)) {
              throw new FS.ErrnoError(8);
            }
            if (offset < 0 || length <= 0) {
              throw new FS.ErrnoError(28);
            }
            if ((stream.flags & 2097155) === 0) {
              throw new FS.ErrnoError(8);
            }
            if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            if (!stream.stream_ops.allocate) {
              throw new FS.ErrnoError(138);
            }
            stream.stream_ops.allocate(stream, offset, length);
          }, mmap: function(stream, address, length, position, prot, flags) {
            if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
              throw new FS.ErrnoError(2);
            }
            if ((stream.flags & 2097155) === 1) {
              throw new FS.ErrnoError(2);
            }
            if (!stream.stream_ops.mmap) {
              throw new FS.ErrnoError(43);
            }
            return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
          }, msync: function(stream, buffer2, offset, length, mmapFlags) {
            if (!stream || !stream.stream_ops.msync) {
              return 0;
            }
            return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
          }, munmap: function(stream) {
            return 0;
          }, ioctl: function(stream, cmd, arg) {
            if (!stream.stream_ops.ioctl) {
              throw new FS.ErrnoError(59);
            }
            return stream.stream_ops.ioctl(stream, cmd, arg);
          }, readFile: function(path, opts) {
            opts = opts || {};
            opts.flags = opts.flags || "r";
            opts.encoding = opts.encoding || "binary";
            if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
              throw new Error('Invalid encoding type "' + opts.encoding + '"');
            }
            var ret;
            var stream = FS.open(path, opts.flags);
            var stat = FS.stat(path);
            var length = stat.size;
            var buf = new Uint8Array(length);
            FS.read(stream, buf, 0, length, 0);
            if (opts.encoding === "utf8") {
              ret = UTF8ArrayToString(buf, 0);
            } else if (opts.encoding === "binary") {
              ret = buf;
            }
            FS.close(stream);
            return ret;
          }, writeFile: function(path, data, opts) {
            opts = opts || {};
            opts.flags = opts.flags || "w";
            var stream = FS.open(path, opts.flags, opts.mode);
            if (typeof data === "string") {
              var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
              var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
              FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
            } else if (ArrayBuffer.isView(data)) {
              FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
            } else {
              throw new Error("Unsupported data type");
            }
            FS.close(stream);
          }, cwd: function() {
            return FS.currentPath;
          }, chdir: function(path) {
            var lookup = FS.lookupPath(path, { follow: true });
            if (lookup.node === null) {
              throw new FS.ErrnoError(44);
            }
            if (!FS.isDir(lookup.node.mode)) {
              throw new FS.ErrnoError(54);
            }
            var errCode = FS.nodePermissions(lookup.node, "x");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
            FS.currentPath = lookup.path;
          }, createDefaultDirectories: function() {
            FS.mkdir("/tmp");
            FS.mkdir("/home");
            FS.mkdir("/home/web_user");
          }, createDefaultDevices: function() {
            FS.mkdir("/dev");
            FS.registerDevice(FS.makedev(1, 3), { read: function() {
              return 0;
            }, write: function(stream, buffer2, offset, length, pos) {
              return length;
            } });
            FS.mkdev("/dev/null", FS.makedev(1, 3));
            TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
            TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
            FS.mkdev("/dev/tty", FS.makedev(5, 0));
            FS.mkdev("/dev/tty1", FS.makedev(6, 0));
            var random_device;
            if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
              var randomBuffer = new Uint8Array(1);
              random_device = function() {
                crypto.getRandomValues(randomBuffer);
                return randomBuffer[0];
              };
            } else if (ENVIRONMENT_IS_NODE) {
              try {
                var crypto_module = __require("crypto");
                random_device = function() {
                  return crypto_module["randomBytes"](1)[0];
                };
              } catch (e) {
              }
            } else {
            }
            if (!random_device) {
              random_device = function() {
                abort("random_device");
              };
            }
            FS.createDevice("/dev", "random", random_device);
            FS.createDevice("/dev", "urandom", random_device);
            FS.mkdir("/dev/shm");
            FS.mkdir("/dev/shm/tmp");
          }, createSpecialDirectories: function() {
            FS.mkdir("/proc");
            FS.mkdir("/proc/self");
            FS.mkdir("/proc/self/fd");
            FS.mount({ mount: function() {
              var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
              node.node_ops = { lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream)
                  throw new FS.ErrnoError(8);
                var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: function() {
                  return stream.path;
                } } };
                ret.parent = ret;
                return ret;
              } };
              return node;
            } }, {}, "/proc/self/fd");
          }, createStandardStreams: function() {
            if (Module["stdin"]) {
              FS.createDevice("/dev", "stdin", Module["stdin"]);
            } else {
              FS.symlink("/dev/tty", "/dev/stdin");
            }
            if (Module["stdout"]) {
              FS.createDevice("/dev", "stdout", null, Module["stdout"]);
            } else {
              FS.symlink("/dev/tty", "/dev/stdout");
            }
            if (Module["stderr"]) {
              FS.createDevice("/dev", "stderr", null, Module["stderr"]);
            } else {
              FS.symlink("/dev/tty1", "/dev/stderr");
            }
            var stdin = FS.open("/dev/stdin", "r");
            var stdout = FS.open("/dev/stdout", "w");
            var stderr = FS.open("/dev/stderr", "w");
          }, ensureErrnoError: function() {
            if (FS.ErrnoError)
              return;
            FS.ErrnoError = function ErrnoError(errno, node) {
              this.node = node;
              this.setErrno = function(errno2) {
                this.errno = errno2;
              };
              this.setErrno(errno);
              this.message = "FS error";
            };
            FS.ErrnoError.prototype = new Error();
            FS.ErrnoError.prototype.constructor = FS.ErrnoError;
            [44].forEach(function(code) {
              FS.genericErrors[code] = new FS.ErrnoError(code);
              FS.genericErrors[code].stack = "<generic error, no stack>";
            });
          }, staticInit: function() {
            FS.ensureErrnoError();
            FS.nameTable = new Array(4096);
            FS.mount(MEMFS, {}, "/");
            FS.createDefaultDirectories();
            FS.createDefaultDevices();
            FS.createSpecialDirectories();
            FS.filesystems = { "MEMFS": MEMFS };
          }, init: function(input, output, error) {
            FS.init.initialized = true;
            FS.ensureErrnoError();
            Module["stdin"] = input || Module["stdin"];
            Module["stdout"] = output || Module["stdout"];
            Module["stderr"] = error || Module["stderr"];
            FS.createStandardStreams();
          }, quit: function() {
            FS.init.initialized = false;
            var fflush = Module["_fflush"];
            if (fflush)
              fflush(0);
            for (var i = 0; i < FS.streams.length; i++) {
              var stream = FS.streams[i];
              if (!stream) {
                continue;
              }
              FS.close(stream);
            }
          }, getMode: function(canRead, canWrite) {
            var mode = 0;
            if (canRead)
              mode |= 292 | 73;
            if (canWrite)
              mode |= 146;
            return mode;
          }, joinPath: function(parts, forceRelative) {
            var path = PATH.join.apply(null, parts);
            if (forceRelative && path[0] == "/")
              path = path.substr(1);
            return path;
          }, absolutePath: function(relative, base) {
            return PATH_FS.resolve(base, relative);
          }, standardizePath: function(path) {
            return PATH.normalize(path);
          }, findObject: function(path, dontResolveLastLink) {
            var ret = FS.analyzePath(path, dontResolveLastLink);
            if (ret.exists) {
              return ret.object;
            } else {
              setErrNo(ret.error);
              return null;
            }
          }, analyzePath: function(path, dontResolveLastLink) {
            try {
              var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
              path = lookup.path;
            } catch (e) {
            }
            var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
            try {
              var lookup = FS.lookupPath(path, { parent: true });
              ret.parentExists = true;
              ret.parentPath = lookup.path;
              ret.parentObject = lookup.node;
              ret.name = PATH.basename(path);
              lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
              ret.exists = true;
              ret.path = lookup.path;
              ret.object = lookup.node;
              ret.name = lookup.node.name;
              ret.isRoot = lookup.path === "/";
            } catch (e) {
              ret.error = e.errno;
            }
            return ret;
          }, createFolder: function(parent, name, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(canRead, canWrite);
            return FS.mkdir(path, mode);
          }, createPath: function(parent, path, canRead, canWrite) {
            parent = typeof parent === "string" ? parent : FS.getPath(parent);
            var parts = path.split("/").reverse();
            while (parts.length) {
              var part = parts.pop();
              if (!part)
                continue;
              var current = PATH.join2(parent, part);
              try {
                FS.mkdir(current);
              } catch (e) {
              }
              parent = current;
            }
            return current;
          }, createFile: function(parent, name, properties, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(canRead, canWrite);
            return FS.create(path, mode);
          }, createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
            var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
            var mode = FS.getMode(canRead, canWrite);
            var node = FS.create(path, mode);
            if (data) {
              if (typeof data === "string") {
                var arr = new Array(data.length);
                for (var i = 0, len = data.length; i < len; ++i)
                  arr[i] = data.charCodeAt(i);
                data = arr;
              }
              FS.chmod(node, mode | 146);
              var stream = FS.open(node, "w");
              FS.write(stream, data, 0, data.length, 0, canOwn);
              FS.close(stream);
              FS.chmod(node, mode);
            }
            return node;
          }, createDevice: function(parent, name, input, output) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            var mode = FS.getMode(!!input, !!output);
            if (!FS.createDevice.major)
              FS.createDevice.major = 64;
            var dev = FS.makedev(FS.createDevice.major++, 0);
            FS.registerDevice(dev, { open: function(stream) {
              stream.seekable = false;
            }, close: function(stream) {
              if (output && output.buffer && output.buffer.length) {
                output(10);
              }
            }, read: function(stream, buffer2, offset, length, pos) {
              var bytesRead = 0;
              for (var i = 0; i < length; i++) {
                var result;
                try {
                  result = input();
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
                if (result === void 0 && bytesRead === 0) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === void 0)
                  break;
                bytesRead++;
                buffer2[offset + i] = result;
              }
              if (bytesRead) {
                stream.node.timestamp = Date.now();
              }
              return bytesRead;
            }, write: function(stream, buffer2, offset, length, pos) {
              for (var i = 0; i < length; i++) {
                try {
                  output(buffer2[offset + i]);
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.timestamp = Date.now();
              }
              return i;
            } });
            return FS.mkdev(path, mode, dev);
          }, createLink: function(parent, name, target, canRead, canWrite) {
            var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
            return FS.symlink(target, path);
          }, forceLoadFile: function(obj) {
            if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
              return true;
            var success = true;
            if (typeof XMLHttpRequest !== "undefined") {
              throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            } else if (read_) {
              try {
                obj.contents = intArrayFromString(read_(obj.url), true);
                obj.usedBytes = obj.contents.length;
              } catch (e) {
                success = false;
              }
            } else {
              throw new Error("Cannot load without read() or XMLHttpRequest.");
            }
            if (!success)
              setErrNo(29);
            return success;
          }, createLazyFile: function(parent, name, url, canRead, canWrite) {
            function LazyUint8Array() {
              this.lengthKnown = false;
              this.chunks = [];
            }
            LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            };
            LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
              this.getter = getter;
            };
            LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing)
                chunkSize = datalength;
              var doXHR = function(from, to) {
                if (from > to)
                  throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1)
                  throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize)
                  xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                if (typeof Uint8Array != "undefined")
                  xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
                  throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(xhr2.response || []);
                } else {
                  return intArrayFromString(xhr2.responseText || "", true);
                }
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] === "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] === "undefined")
                  throw new Error("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            };
            if (typeof XMLHttpRequest !== "undefined") {
              if (!ENVIRONMENT_IS_WORKER)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
              var lazyArray = new LazyUint8Array();
              Object.defineProperties(lazyArray, { length: { get: function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              } }, chunkSize: { get: function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              } } });
              var properties = { isDevice: false, contents: lazyArray };
            } else {
              var properties = { isDevice: false, url };
            }
            var node = FS.createFile(parent, name, properties, canRead, canWrite);
            if (properties.contents) {
              node.contents = properties.contents;
            } else if (properties.url) {
              node.contents = null;
              node.url = properties.url;
            }
            Object.defineProperties(node, { usedBytes: { get: function() {
              return this.contents.length;
            } } });
            var stream_ops = {};
            var keys = Object.keys(node.stream_ops);
            keys.forEach(function(key2) {
              var fn = node.stream_ops[key2];
              stream_ops[key2] = function forceLoadLazyFile() {
                if (!FS.forceLoadFile(node)) {
                  throw new FS.ErrnoError(29);
                }
                return fn.apply(null, arguments);
              };
            });
            stream_ops.read = function stream_ops_read(stream, buffer2, offset, length, position) {
              if (!FS.forceLoadFile(node)) {
                throw new FS.ErrnoError(29);
              }
              var contents = stream.node.contents;
              if (position >= contents.length)
                return 0;
              var size = Math.min(contents.length - position, length);
              if (contents.slice) {
                for (var i = 0; i < size; i++) {
                  buffer2[offset + i] = contents[position + i];
                }
              } else {
                for (var i = 0; i < size; i++) {
                  buffer2[offset + i] = contents.get(position + i);
                }
              }
              return size;
            };
            node.stream_ops = stream_ops;
            return node;
          }, createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
            Browser.init();
            var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
            var dep = getUniqueRunDependency("cp " + fullname);
            function processData(byteArray) {
              function finish(byteArray2) {
                if (preFinish)
                  preFinish();
                if (!dontCreateFile) {
                  FS.createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
                }
                if (onload)
                  onload();
                removeRunDependency(dep);
              }
              var handled = false;
              Module["preloadPlugins"].forEach(function(plugin) {
                if (handled)
                  return;
                if (plugin["canHandle"](fullname)) {
                  plugin["handle"](byteArray, fullname, finish, function() {
                    if (onerror)
                      onerror();
                    removeRunDependency(dep);
                  });
                  handled = true;
                }
              });
              if (!handled)
                finish(byteArray);
            }
            addRunDependency(dep);
            if (typeof url == "string") {
              Browser.asyncLoad(url, function(byteArray) {
                processData(byteArray);
              }, onerror);
            } else {
              processData(url);
            }
          }, indexedDB: function() {
            return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
          }, DB_NAME: function() {
            return "EM_FS_" + window.location.pathname;
          }, DB_VERSION: 20, DB_STORE_NAME: "FILE_DATA", saveFilesToDB: function(paths, onload, onerror) {
            onload = onload || function() {
            };
            onerror = onerror || function() {
            };
            var indexedDB = FS.indexedDB();
            try {
              var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
            } catch (e) {
              return onerror(e);
            }
            openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
              out("creating db");
              var db = openRequest.result;
              db.createObjectStore(FS.DB_STORE_NAME);
            };
            openRequest.onsuccess = function openRequest_onsuccess() {
              var db = openRequest.result;
              var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
              var files = transaction.objectStore(FS.DB_STORE_NAME);
              var ok = 0, fail = 0, total = paths.length;
              function finish() {
                if (fail == 0)
                  onload();
                else
                  onerror();
              }
              paths.forEach(function(path) {
                var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                putRequest.onsuccess = function putRequest_onsuccess() {
                  ok++;
                  if (ok + fail == total)
                    finish();
                };
                putRequest.onerror = function putRequest_onerror() {
                  fail++;
                  if (ok + fail == total)
                    finish();
                };
              });
              transaction.onerror = onerror;
            };
            openRequest.onerror = onerror;
          }, loadFilesFromDB: function(paths, onload, onerror) {
            onload = onload || function() {
            };
            onerror = onerror || function() {
            };
            var indexedDB = FS.indexedDB();
            try {
              var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
            } catch (e) {
              return onerror(e);
            }
            openRequest.onupgradeneeded = onerror;
            openRequest.onsuccess = function openRequest_onsuccess() {
              var db = openRequest.result;
              try {
                var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
              } catch (e) {
                onerror(e);
                return;
              }
              var files = transaction.objectStore(FS.DB_STORE_NAME);
              var ok = 0, fail = 0, total = paths.length;
              function finish() {
                if (fail == 0)
                  onload();
                else
                  onerror();
              }
              paths.forEach(function(path) {
                var getRequest = files.get(path);
                getRequest.onsuccess = function getRequest_onsuccess() {
                  if (FS.analyzePath(path).exists) {
                    FS.unlink(path);
                  }
                  FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                  ok++;
                  if (ok + fail == total)
                    finish();
                };
                getRequest.onerror = function getRequest_onerror() {
                  fail++;
                  if (ok + fail == total)
                    finish();
                };
              });
              transaction.onerror = onerror;
            };
            openRequest.onerror = onerror;
          } };
          var SYSCALLS = { mappings: {}, DEFAULT_POLLMASK: 5, umask: 511, calculateAt: function(dirfd, path) {
            if (path[0] !== "/") {
              var dir;
              if (dirfd === -100) {
                dir = FS.cwd();
              } else {
                var dirstream = FS.getStream(dirfd);
                if (!dirstream)
                  throw new FS.ErrnoError(8);
                dir = dirstream.path;
              }
              path = PATH.join2(dir, path);
            }
            return path;
          }, doStat: function(func, path, buf) {
            try {
              var stat = func(path);
            } catch (e) {
              if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                return -54;
              }
              throw e;
            }
            HEAP32[buf >> 2] = stat.dev;
            HEAP32[buf + 4 >> 2] = 0;
            HEAP32[buf + 8 >> 2] = stat.ino;
            HEAP32[buf + 12 >> 2] = stat.mode;
            HEAP32[buf + 16 >> 2] = stat.nlink;
            HEAP32[buf + 20 >> 2] = stat.uid;
            HEAP32[buf + 24 >> 2] = stat.gid;
            HEAP32[buf + 28 >> 2] = stat.rdev;
            HEAP32[buf + 32 >> 2] = 0;
            tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
            HEAP32[buf + 48 >> 2] = 4096;
            HEAP32[buf + 52 >> 2] = stat.blocks;
            HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
            HEAP32[buf + 60 >> 2] = 0;
            HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
            HEAP32[buf + 68 >> 2] = 0;
            HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
            HEAP32[buf + 76 >> 2] = 0;
            tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
            return 0;
          }, doMsync: function(addr, stream, len, flags, offset) {
            var buffer2 = HEAPU8.slice(addr, addr + len);
            FS.msync(stream, buffer2, offset, len, flags);
          }, doMkdir: function(path, mode) {
            path = PATH.normalize(path);
            if (path[path.length - 1] === "/")
              path = path.substr(0, path.length - 1);
            FS.mkdir(path, mode, 0);
            return 0;
          }, doMknod: function(path, mode, dev) {
            switch (mode & 61440) {
              case 32768:
              case 8192:
              case 24576:
              case 4096:
              case 49152:
                break;
              default:
                return -28;
            }
            FS.mknod(path, mode, dev);
            return 0;
          }, doReadlink: function(path, buf, bufsize) {
            if (bufsize <= 0)
              return -28;
            var ret = FS.readlink(path);
            var len = Math.min(bufsize, lengthBytesUTF8(ret));
            var endChar = HEAP8[buf + len];
            stringToUTF8(ret, buf, bufsize + 1);
            HEAP8[buf + len] = endChar;
            return len;
          }, doAccess: function(path, amode) {
            if (amode & ~7) {
              return -28;
            }
            var node;
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
            if (!node) {
              return -44;
            }
            var perms = "";
            if (amode & 4)
              perms += "r";
            if (amode & 2)
              perms += "w";
            if (amode & 1)
              perms += "x";
            if (perms && FS.nodePermissions(node, perms)) {
              return -2;
            }
            return 0;
          }, doDup: function(path, flags, suggestFD) {
            var suggest = FS.getStream(suggestFD);
            if (suggest)
              FS.close(suggest);
            return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
          }, doReadv: function(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
              var ptr = HEAP32[iov + i * 8 >> 2];
              var len = HEAP32[iov + (i * 8 + 4) >> 2];
              var curr = FS.read(stream, HEAP8, ptr, len, offset);
              if (curr < 0)
                return -1;
              ret += curr;
              if (curr < len)
                break;
            }
            return ret;
          }, doWritev: function(stream, iov, iovcnt, offset) {
            var ret = 0;
            for (var i = 0; i < iovcnt; i++) {
              var ptr = HEAP32[iov + i * 8 >> 2];
              var len = HEAP32[iov + (i * 8 + 4) >> 2];
              var curr = FS.write(stream, HEAP8, ptr, len, offset);
              if (curr < 0)
                return -1;
              ret += curr;
            }
            return ret;
          }, varargs: void 0, get: function() {
            SYSCALLS.varargs += 4;
            var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
            return ret;
          }, getStr: function(ptr) {
            var ret = UTF8ToString(ptr);
            return ret;
          }, getStreamFromFD: function(fd) {
            var stream = FS.getStream(fd);
            if (!stream)
              throw new FS.ErrnoError(8);
            return stream;
          }, get64: function(low, high) {
            return low;
          } };
          function ___sys_fcntl64(fd, cmd, varargs) {
            SYSCALLS.varargs = varargs;
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              switch (cmd) {
                case 0: {
                  var arg = SYSCALLS.get();
                  if (arg < 0) {
                    return -28;
                  }
                  var newStream;
                  newStream = FS.open(stream.path, stream.flags, 0, arg);
                  return newStream.fd;
                }
                case 1:
                case 2:
                  return 0;
                case 3:
                  return stream.flags;
                case 4: {
                  var arg = SYSCALLS.get();
                  stream.flags |= arg;
                  return 0;
                }
                case 12: {
                  var arg = SYSCALLS.get();
                  var offset = 0;
                  HEAP16[arg + offset >> 1] = 2;
                  return 0;
                }
                case 13:
                case 14:
                  return 0;
                case 16:
                case 8:
                  return -28;
                case 9:
                  setErrNo(28);
                  return -1;
                default: {
                  return -28;
                }
              }
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function ___sys_ioctl(fd, op, varargs) {
            SYSCALLS.varargs = varargs;
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              switch (op) {
                case 21509:
                case 21505: {
                  if (!stream.tty)
                    return -59;
                  return 0;
                }
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508: {
                  if (!stream.tty)
                    return -59;
                  return 0;
                }
                case 21519: {
                  if (!stream.tty)
                    return -59;
                  var argp = SYSCALLS.get();
                  HEAP32[argp >> 2] = 0;
                  return 0;
                }
                case 21520: {
                  if (!stream.tty)
                    return -59;
                  return -28;
                }
                case 21531: {
                  var argp = SYSCALLS.get();
                  return FS.ioctl(stream, op, argp);
                }
                case 21523: {
                  if (!stream.tty)
                    return -59;
                  return 0;
                }
                case 21524: {
                  if (!stream.tty)
                    return -59;
                  return 0;
                }
                default:
                  abort("bad ioctl syscall " + op);
              }
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function ___sys_open(path, flags, varargs) {
            SYSCALLS.varargs = varargs;
            try {
              var pathname = SYSCALLS.getStr(path);
              var mode = SYSCALLS.get();
              var stream = FS.open(pathname, flags, mode);
              return stream.fd;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function ___sys_rmdir(path) {
            try {
              path = SYSCALLS.getStr(path);
              FS.rmdir(path);
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function ___sys_stat64(path, buf) {
            try {
              path = SYSCALLS.getStr(path);
              return SYSCALLS.doStat(FS.stat, path, buf);
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function ___sys_unlink(path) {
            try {
              path = SYSCALLS.getStr(path);
              FS.unlink(path);
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return -e.errno;
            }
          }
          function _longjmp(env, value) {
            _setThrew(env, value || 1);
            throw "longjmp";
          }
          function _emscripten_longjmp(env, value) {
            _longjmp(env, value);
          }
          function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num);
          }
          function _emscripten_get_heap_size() {
            return HEAPU8.length;
          }
          function emscripten_realloc_buffer(size) {
            try {
              wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
              updateGlobalBufferAndViews(wasmMemory.buffer);
              return 1;
            } catch (e) {
            }
          }
          function _emscripten_resize_heap(requestedSize) {
            requestedSize = requestedSize >>> 0;
            var oldSize = _emscripten_get_heap_size();
            var PAGE_MULTIPLE = 65536;
            var maxHeapSize = 2147483648;
            if (requestedSize > maxHeapSize) {
              return false;
            }
            var minHeapSize = 16777216;
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
              var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
              overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
              var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
              var replacement = emscripten_realloc_buffer(newSize);
              if (replacement) {
                return true;
              }
            }
            return false;
          }
          var ENV = {};
          function __getExecutableName() {
            return thisProgram || "./this.program";
          }
          function getEnvStrings() {
            if (!getEnvStrings.strings) {
              var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", "_": __getExecutableName() };
              for (var x in ENV) {
                env[x] = ENV[x];
              }
              var strings = [];
              for (var x in env) {
                strings.push(x + "=" + env[x]);
              }
              getEnvStrings.strings = strings;
            }
            return getEnvStrings.strings;
          }
          function _environ_get(__environ, environ_buf) {
            var bufSize = 0;
            getEnvStrings().forEach(function(string, i) {
              var ptr = environ_buf + bufSize;
              HEAP32[__environ + i * 4 >> 2] = ptr;
              writeAsciiToMemory(string, ptr);
              bufSize += string.length + 1;
            });
            return 0;
          }
          function _environ_sizes_get(penviron_count, penviron_buf_size) {
            var strings = getEnvStrings();
            HEAP32[penviron_count >> 2] = strings.length;
            var bufSize = 0;
            strings.forEach(function(string) {
              bufSize += string.length + 1;
            });
            HEAP32[penviron_buf_size >> 2] = bufSize;
            return 0;
          }
          function _exit(status) {
            exit(status);
          }
          function _fd_close(fd) {
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              FS.close(stream);
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return e.errno;
            }
          }
          function _fd_read(fd, iov, iovcnt, pnum) {
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              var num = SYSCALLS.doReadv(stream, iov, iovcnt);
              HEAP32[pnum >> 2] = num;
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return e.errno;
            }
          }
          function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              var HIGH_OFFSET = 4294967296;
              var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
              var DOUBLE_LIMIT = 9007199254740992;
              if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
                return -61;
              }
              FS.llseek(stream, offset, whence);
              tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
              if (stream.getdents && offset === 0 && whence === 0)
                stream.getdents = null;
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return e.errno;
            }
          }
          function _fd_write(fd, iov, iovcnt, pnum) {
            try {
              var stream = SYSCALLS.getStreamFromFD(fd);
              var num = SYSCALLS.doWritev(stream, iov, iovcnt);
              HEAP32[pnum >> 2] = num;
              return 0;
            } catch (e) {
              if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
                abort(e);
              return e.errno;
            }
          }
          function _getTempRet0() {
            return getTempRet0() | 0;
          }
          var ___tm_current = 2104816;
          var ___tm_timezone = (stringToUTF8("GMT", 2104864, 4), 2104864);
          function _gmtime_r(time, tmPtr) {
            var date = new Date(HEAP32[time >> 2] * 1e3);
            HEAP32[tmPtr >> 2] = date.getUTCSeconds();
            HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
            HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
            HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
            HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
            HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
            HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
            HEAP32[tmPtr + 36 >> 2] = 0;
            HEAP32[tmPtr + 32 >> 2] = 0;
            var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
            var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
            HEAP32[tmPtr + 28 >> 2] = yday;
            HEAP32[tmPtr + 40 >> 2] = ___tm_timezone;
            return tmPtr;
          }
          function _gmtime(time) {
            return _gmtime_r(time, ___tm_current);
          }
          function _setTempRet0($i) {
            setTempRet0($i | 0);
          }
          function _time(ptr) {
            var ret = Date.now() / 1e3 | 0;
            if (ptr) {
              HEAP32[ptr >> 2] = ret;
            }
            return ret;
          }
          var FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
          var readMode = 292 | 73;
          var writeMode = 146;
          Object.defineProperties(FSNode.prototype, { read: { get: function() {
            return (this.mode & readMode) === readMode;
          }, set: function(val) {
            val ? this.mode |= readMode : this.mode &= ~readMode;
          } }, write: { get: function() {
            return (this.mode & writeMode) === writeMode;
          }, set: function(val) {
            val ? this.mode |= writeMode : this.mode &= ~writeMode;
          } }, isFolder: { get: function() {
            return FS.isDir(this.mode);
          } }, isDevice: { get: function() {
            return FS.isChrdev(this.mode);
          } } });
          FS.FSNode = FSNode;
          FS.staticInit();
          function intArrayFromString(stringy, dontAddNull, length) {
            var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
            var u8array = new Array(len);
            var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
            if (dontAddNull)
              u8array.length = numBytesWritten;
            return u8array;
          }
          var asmLibraryArg = { "Q": ___sys_fcntl64, "xa": ___sys_ioctl, "Aa": ___sys_open, "ya": ___sys_rmdir, "Ba": ___sys_stat64, "za": ___sys_unlink, "c": _emscripten_longjmp, "sa": _emscripten_memcpy_big, "ta": _emscripten_resize_heap, "ua": _environ_get, "va": _environ_sizes_get, "ba": _exit, "R": _fd_close, "wa": _fd_read, "fa": _fd_seek, "P": _fd_write, "a": _getTempRet0, "X": _gmtime, "v": invoke_fii, "o": invoke_fiii, "E": invoke_fiiii, "h": invoke_ii, "_": invoke_iif, "d": invoke_iii, "Ia": invoke_iiidi, "N": invoke_iiiffffiii, "ca": invoke_iiiffiiiiiii, "e": invoke_iiii, "Ga": invoke_iiiif, "k": invoke_iiiii, "Ca": invoke_iiiiifffiiii, "I": invoke_iiiiiffi, "ea": invoke_iiiiiffii, "Y": invoke_iiiiiffiifii, "da": invoke_iiiiifiii, "m": invoke_iiiiii, "p": invoke_iiiiiii, "s": invoke_iiiiiiii, "w": invoke_iiiiiiiii, "G": invoke_iiiiiiiiii, "aa": invoke_iiiiiiiiiii, "L": invoke_iiiiiiiiiiiiii, "Ha": invoke_iiiiiiiiiiiiiiiii, "pa": invoke_iiiiiiiij, "ga": invoke_iiiiij, "qa": invoke_iiiij, "ha": invoke_iiiji, "na": invoke_iij, "ma": invoke_jii, "ia": invoke_jiiji, "j": invoke_vi, "f": invoke_vii, "$": invoke_viid, "x": invoke_viif, "u": invoke_viiff, "U": invoke_viifff, "z": invoke_viiffff, "C": invoke_viiffffff, "S": invoke_viifffiiff, "V": invoke_viiffii, "i": invoke_viii, "Da": invoke_viiid, "W": invoke_viiif, "Z": invoke_viiifffffiii, "g": invoke_viiii, "T": invoke_viiiif, "t": invoke_viiiiff, "B": invoke_viiiifi, "l": invoke_viiiii, "Ea": invoke_viiiiiffifi, "Fa": invoke_viiiiifii, "n": invoke_viiiiii, "F": invoke_viiiiiifi, "q": invoke_viiiiiii, "D": invoke_viiiiiiif, "y": invoke_viiiiiiifi, "K": invoke_viiiiiiifiifffffiii, "r": invoke_viiiiiiii, "H": invoke_viiiiiiiii, "M": invoke_viiiiiiiiii, "J": invoke_viiiiiiiiiii, "A": invoke_viiiiiiiiiiiii, "la": invoke_viiij, "oa": invoke_viij, "ka": invoke_viiji, "ja": invoke_viijii, "ra": invoke_vij, "memory": wasmMemory, "b": _setTempRet0, "table": wasmTable, "O": _time };
          var asm = createWasm();
          var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
            return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["Ja"]).apply(null, arguments);
          };
          var _initContext = Module["_initContext"] = function() {
            return (_initContext = Module["_initContext"] = Module["asm"]["Ka"]).apply(null, arguments);
          };
          var _openDocument = Module["_openDocument"] = function() {
            return (_openDocument = Module["_openDocument"] = Module["asm"]["La"]).apply(null, arguments);
          };
          var _freeDocument = Module["_freeDocument"] = function() {
            return (_freeDocument = Module["_freeDocument"] = Module["asm"]["Ma"]).apply(null, arguments);
          };
          var _countPages = Module["_countPages"] = function() {
            return (_countPages = Module["_countPages"] = Module["asm"]["Na"]).apply(null, arguments);
          };
          var _drawPageAsHTML = Module["_drawPageAsHTML"] = function() {
            return (_drawPageAsHTML = Module["_drawPageAsHTML"] = Module["asm"]["Oa"]).apply(null, arguments);
          };
          var _drawPageAsSVG = Module["_drawPageAsSVG"] = function() {
            return (_drawPageAsSVG = Module["_drawPageAsSVG"] = Module["asm"]["Pa"]).apply(null, arguments);
          };
          var _drawPageAsPNG = Module["_drawPageAsPNG"] = function() {
            return (_drawPageAsPNG = Module["_drawPageAsPNG"] = Module["asm"]["Qa"]).apply(null, arguments);
          };
          var _pageWidth = Module["_pageWidth"] = function() {
            return (_pageWidth = Module["_pageWidth"] = Module["asm"]["Ra"]).apply(null, arguments);
          };
          var _pageHeight = Module["_pageHeight"] = function() {
            return (_pageHeight = Module["_pageHeight"] = Module["asm"]["Sa"]).apply(null, arguments);
          };
          var _pageLinks = Module["_pageLinks"] = function() {
            return (_pageLinks = Module["_pageLinks"] = Module["asm"]["Ta"]).apply(null, arguments);
          };
          var _documentTitle = Module["_documentTitle"] = function() {
            return (_documentTitle = Module["_documentTitle"] = Module["asm"]["Ua"]).apply(null, arguments);
          };
          var _loadOutline = Module["_loadOutline"] = function() {
            return (_loadOutline = Module["_loadOutline"] = Module["asm"]["Va"]).apply(null, arguments);
          };
          var _freeOutline = Module["_freeOutline"] = function() {
            return (_freeOutline = Module["_freeOutline"] = Module["asm"]["Wa"]).apply(null, arguments);
          };
          var _outlineTitle = Module["_outlineTitle"] = function() {
            return (_outlineTitle = Module["_outlineTitle"] = Module["asm"]["Xa"]).apply(null, arguments);
          };
          var _outlinePage = Module["_outlinePage"] = function() {
            return (_outlinePage = Module["_outlinePage"] = Module["asm"]["Ya"]).apply(null, arguments);
          };
          var _outlineDown = Module["_outlineDown"] = function() {
            return (_outlineDown = Module["_outlineDown"] = Module["asm"]["Za"]).apply(null, arguments);
          };
          var _outlineNext = Module["_outlineNext"] = function() {
            return (_outlineNext = Module["_outlineNext"] = Module["asm"]["_a"]).apply(null, arguments);
          };
          var _malloc = Module["_malloc"] = function() {
            return (_malloc = Module["_malloc"] = Module["asm"]["$a"]).apply(null, arguments);
          };
          var ___errno_location = Module["___errno_location"] = function() {
            return (___errno_location = Module["___errno_location"] = Module["asm"]["ab"]).apply(null, arguments);
          };
          var _setThrew = Module["_setThrew"] = function() {
            return (_setThrew = Module["_setThrew"] = Module["asm"]["bb"]).apply(null, arguments);
          };
          var stackSave = Module["stackSave"] = function() {
            return (stackSave = Module["stackSave"] = Module["asm"]["cb"]).apply(null, arguments);
          };
          var stackRestore = Module["stackRestore"] = function() {
            return (stackRestore = Module["stackRestore"] = Module["asm"]["db"]).apply(null, arguments);
          };
          var stackAlloc = Module["stackAlloc"] = function() {
            return (stackAlloc = Module["stackAlloc"] = Module["asm"]["eb"]).apply(null, arguments);
          };
          var dynCall_v = Module["dynCall_v"] = function() {
            return (dynCall_v = Module["dynCall_v"] = Module["asm"]["fb"]).apply(null, arguments);
          };
          var dynCall_vi = Module["dynCall_vi"] = function() {
            return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["gb"]).apply(null, arguments);
          };
          var dynCall_vii = Module["dynCall_vii"] = function() {
            return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["hb"]).apply(null, arguments);
          };
          var dynCall_viii = Module["dynCall_viii"] = function() {
            return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["ib"]).apply(null, arguments);
          };
          var dynCall_viiii = Module["dynCall_viiii"] = function() {
            return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["jb"]).apply(null, arguments);
          };
          var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
            return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["kb"]).apply(null, arguments);
          };
          var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
            return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["lb"]).apply(null, arguments);
          };
          var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = function() {
            return (dynCall_viiiiiii = Module["dynCall_viiiiiii"] = Module["asm"]["mb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = function() {
            return (dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = Module["asm"]["nb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = function() {
            return (dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = Module["asm"]["ob"]).apply(null, arguments);
          };
          var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = function() {
            return (dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = Module["asm"]["pb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = function() {
            return (dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = Module["asm"]["qb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiii"] = function() {
            return (dynCall_viiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiii"] = Module["asm"]["rb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiif = Module["dynCall_viiiiiiif"] = function() {
            return (dynCall_viiiiiiif = Module["dynCall_viiiiiiif"] = Module["asm"]["sb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiifi = Module["dynCall_viiiiiiifi"] = function() {
            return (dynCall_viiiiiiifi = Module["dynCall_viiiiiiifi"] = Module["asm"]["tb"]).apply(null, arguments);
          };
          var dynCall_viiiiiiifiifffffiii = Module["dynCall_viiiiiiifiifffffiii"] = function() {
            return (dynCall_viiiiiiifiifffffiii = Module["dynCall_viiiiiiifiifffffiii"] = Module["asm"]["ub"]).apply(null, arguments);
          };
          var dynCall_viiiiiifi = Module["dynCall_viiiiiifi"] = function() {
            return (dynCall_viiiiiifi = Module["dynCall_viiiiiifi"] = Module["asm"]["vb"]).apply(null, arguments);
          };
          var dynCall_viiiiifii = Module["dynCall_viiiiifii"] = function() {
            return (dynCall_viiiiifii = Module["dynCall_viiiiifii"] = Module["asm"]["wb"]).apply(null, arguments);
          };
          var dynCall_viiiiiffifi = Module["dynCall_viiiiiffifi"] = function() {
            return (dynCall_viiiiiffifi = Module["dynCall_viiiiiffifi"] = Module["asm"]["xb"]).apply(null, arguments);
          };
          var dynCall_viiiif = Module["dynCall_viiiif"] = function() {
            return (dynCall_viiiif = Module["dynCall_viiiif"] = Module["asm"]["yb"]).apply(null, arguments);
          };
          var dynCall_viiiifi = Module["dynCall_viiiifi"] = function() {
            return (dynCall_viiiifi = Module["dynCall_viiiifi"] = Module["asm"]["zb"]).apply(null, arguments);
          };
          var dynCall_viiiiff = Module["dynCall_viiiiff"] = function() {
            return (dynCall_viiiiff = Module["dynCall_viiiiff"] = Module["asm"]["Ab"]).apply(null, arguments);
          };
          var dynCall_viiij = Module["dynCall_viiij"] = function() {
            return (dynCall_viiij = Module["dynCall_viiij"] = Module["asm"]["Bb"]).apply(null, arguments);
          };
          var dynCall_viiif = Module["dynCall_viiif"] = function() {
            return (dynCall_viiif = Module["dynCall_viiif"] = Module["asm"]["Cb"]).apply(null, arguments);
          };
          var dynCall_viiifffffiii = Module["dynCall_viiifffffiii"] = function() {
            return (dynCall_viiifffffiii = Module["dynCall_viiifffffiii"] = Module["asm"]["Db"]).apply(null, arguments);
          };
          var dynCall_viiid = Module["dynCall_viiid"] = function() {
            return (dynCall_viiid = Module["dynCall_viiid"] = Module["asm"]["Eb"]).apply(null, arguments);
          };
          var dynCall_viij = Module["dynCall_viij"] = function() {
            return (dynCall_viij = Module["dynCall_viij"] = Module["asm"]["Fb"]).apply(null, arguments);
          };
          var dynCall_viiji = Module["dynCall_viiji"] = function() {
            return (dynCall_viiji = Module["dynCall_viiji"] = Module["asm"]["Gb"]).apply(null, arguments);
          };
          var dynCall_viijii = Module["dynCall_viijii"] = function() {
            return (dynCall_viijii = Module["dynCall_viijii"] = Module["asm"]["Hb"]).apply(null, arguments);
          };
          var dynCall_viif = Module["dynCall_viif"] = function() {
            return (dynCall_viif = Module["dynCall_viif"] = Module["asm"]["Ib"]).apply(null, arguments);
          };
          var dynCall_viiff = Module["dynCall_viiff"] = function() {
            return (dynCall_viiff = Module["dynCall_viiff"] = Module["asm"]["Jb"]).apply(null, arguments);
          };
          var dynCall_viiffii = Module["dynCall_viiffii"] = function() {
            return (dynCall_viiffii = Module["dynCall_viiffii"] = Module["asm"]["Kb"]).apply(null, arguments);
          };
          var dynCall_viifff = Module["dynCall_viifff"] = function() {
            return (dynCall_viifff = Module["dynCall_viifff"] = Module["asm"]["Lb"]).apply(null, arguments);
          };
          var dynCall_viifffiiff = Module["dynCall_viifffiiff"] = function() {
            return (dynCall_viifffiiff = Module["dynCall_viifffiiff"] = Module["asm"]["Mb"]).apply(null, arguments);
          };
          var dynCall_viiffff = Module["dynCall_viiffff"] = function() {
            return (dynCall_viiffff = Module["dynCall_viiffff"] = Module["asm"]["Nb"]).apply(null, arguments);
          };
          var dynCall_viiffffff = Module["dynCall_viiffffff"] = function() {
            return (dynCall_viiffffff = Module["dynCall_viiffffff"] = Module["asm"]["Ob"]).apply(null, arguments);
          };
          var dynCall_viid = Module["dynCall_viid"] = function() {
            return (dynCall_viid = Module["dynCall_viid"] = Module["asm"]["Pb"]).apply(null, arguments);
          };
          var dynCall_vij = Module["dynCall_vij"] = function() {
            return (dynCall_vij = Module["dynCall_vij"] = Module["asm"]["Qb"]).apply(null, arguments);
          };
          var dynCall_ii = Module["dynCall_ii"] = function() {
            return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["Rb"]).apply(null, arguments);
          };
          var dynCall_iii = Module["dynCall_iii"] = function() {
            return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["Sb"]).apply(null, arguments);
          };
          var dynCall_iiii = Module["dynCall_iiii"] = function() {
            return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["Tb"]).apply(null, arguments);
          };
          var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
            return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["Ub"]).apply(null, arguments);
          };
          var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
            return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["Vb"]).apply(null, arguments);
          };
          var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
            return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["Wb"]).apply(null, arguments);
          };
          var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
            return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["Xb"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
            return (dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = Module["asm"]["Yb"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function() {
            return (dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = Module["asm"]["Zb"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = function() {
            return (dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = Module["asm"]["_b"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiiii"] = function() {
            return (dynCall_iiiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiiii"] = Module["asm"]["$b"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiiiiiii"] = function() {
            return (dynCall_iiiiiiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiiiiiii"] = Module["asm"]["ac"]).apply(null, arguments);
          };
          var dynCall_iiiiiiiij = Module["dynCall_iiiiiiiij"] = function() {
            return (dynCall_iiiiiiiij = Module["dynCall_iiiiiiiij"] = Module["asm"]["bc"]).apply(null, arguments);
          };
          var dynCall_iiiiij = Module["dynCall_iiiiij"] = function() {
            return (dynCall_iiiiij = Module["dynCall_iiiiij"] = Module["asm"]["cc"]).apply(null, arguments);
          };
          var dynCall_iiiiifiii = Module["dynCall_iiiiifiii"] = function() {
            return (dynCall_iiiiifiii = Module["dynCall_iiiiifiii"] = Module["asm"]["dc"]).apply(null, arguments);
          };
          var dynCall_iiiiiffi = Module["dynCall_iiiiiffi"] = function() {
            return (dynCall_iiiiiffi = Module["dynCall_iiiiiffi"] = Module["asm"]["ec"]).apply(null, arguments);
          };
          var dynCall_iiiiiffii = Module["dynCall_iiiiiffii"] = function() {
            return (dynCall_iiiiiffii = Module["dynCall_iiiiiffii"] = Module["asm"]["fc"]).apply(null, arguments);
          };
          var dynCall_iiiiiffiifii = Module["dynCall_iiiiiffiifii"] = function() {
            return (dynCall_iiiiiffiifii = Module["dynCall_iiiiiffiifii"] = Module["asm"]["gc"]).apply(null, arguments);
          };
          var dynCall_iiiiifffiiii = Module["dynCall_iiiiifffiiii"] = function() {
            return (dynCall_iiiiifffiiii = Module["dynCall_iiiiifffiiii"] = Module["asm"]["hc"]).apply(null, arguments);
          };
          var dynCall_iiiij = Module["dynCall_iiiij"] = function() {
            return (dynCall_iiiij = Module["dynCall_iiiij"] = Module["asm"]["ic"]).apply(null, arguments);
          };
          var dynCall_iiiif = Module["dynCall_iiiif"] = function() {
            return (dynCall_iiiif = Module["dynCall_iiiif"] = Module["asm"]["jc"]).apply(null, arguments);
          };
          var dynCall_iiiji = Module["dynCall_iiiji"] = function() {
            return (dynCall_iiiji = Module["dynCall_iiiji"] = Module["asm"]["kc"]).apply(null, arguments);
          };
          var dynCall_iiiffiiiiiii = Module["dynCall_iiiffiiiiiii"] = function() {
            return (dynCall_iiiffiiiiiii = Module["dynCall_iiiffiiiiiii"] = Module["asm"]["lc"]).apply(null, arguments);
          };
          var dynCall_iiiffffiii = Module["dynCall_iiiffffiii"] = function() {
            return (dynCall_iiiffffiii = Module["dynCall_iiiffffiii"] = Module["asm"]["mc"]).apply(null, arguments);
          };
          var dynCall_iiidi = Module["dynCall_iiidi"] = function() {
            return (dynCall_iiidi = Module["dynCall_iiidi"] = Module["asm"]["nc"]).apply(null, arguments);
          };
          var dynCall_iij = Module["dynCall_iij"] = function() {
            return (dynCall_iij = Module["dynCall_iij"] = Module["asm"]["oc"]).apply(null, arguments);
          };
          var dynCall_iif = Module["dynCall_iif"] = function() {
            return (dynCall_iif = Module["dynCall_iif"] = Module["asm"]["pc"]).apply(null, arguments);
          };
          var dynCall_jii = Module["dynCall_jii"] = function() {
            return (dynCall_jii = Module["dynCall_jii"] = Module["asm"]["qc"]).apply(null, arguments);
          };
          var dynCall_jiiji = Module["dynCall_jiiji"] = function() {
            return (dynCall_jiiji = Module["dynCall_jiiji"] = Module["asm"]["rc"]).apply(null, arguments);
          };
          var dynCall_fii = Module["dynCall_fii"] = function() {
            return (dynCall_fii = Module["dynCall_fii"] = Module["asm"]["sc"]).apply(null, arguments);
          };
          var dynCall_fiii = Module["dynCall_fiii"] = function() {
            return (dynCall_fiii = Module["dynCall_fiii"] = Module["asm"]["tc"]).apply(null, arguments);
          };
          var dynCall_fiiii = Module["dynCall_fiiii"] = function() {
            return (dynCall_fiiii = Module["dynCall_fiiii"] = Module["asm"]["uc"]).apply(null, arguments);
          };
          function invoke_iiii(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              return dynCall_iiii(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_ii(index, a1) {
            var sp = stackSave();
            try {
              return dynCall_ii(index, a1);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iii(index, a1, a2) {
            var sp = stackSave();
            try {
              return dynCall_iii(index, a1, a2);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_vii(index, a1, a2) {
            var sp = stackSave();
            try {
              dynCall_vii(index, a1, a2);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_vi(index, a1) {
            var sp = stackSave();
            try {
              dynCall_vi(index, a1);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiii(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              dynCall_viiii(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiidi(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              return dynCall_iiidi(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              return dynCall_iiiiii(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiii(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              return dynCall_iiiii(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viii(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              dynCall_viii(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viiiiii(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiii(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              dynCall_viiiii(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              dynCall_viiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viiiifi(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
            var sp = stackSave();
            try {
              dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiffii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiffii(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiff(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              dynCall_viiff(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viif(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              dynCall_viif(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              return dynCall_iiiffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              return dynCall_iiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiffiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            var sp = stackSave();
            try {
              return dynCall_iiiffiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viid(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              dynCall_viid(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iif(index, a1, a2) {
            var sp = stackSave();
            try {
              return dynCall_iif(index, a1, a2);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiif(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              return dynCall_iiiif(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_fiii(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              return dynCall_fiii(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_fii(index, a1, a2) {
            var sp = stackSave();
            try {
              return dynCall_fii(index, a1, a2);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_fiiii(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              return dynCall_fiiii(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiffff(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viiffff(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              dynCall_viiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiffifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
            var sp = stackSave();
            try {
              dynCall_viiiiiffifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiid(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              dynCall_viiid(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiifffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            var sp = stackSave();
            try {
              dynCall_viiifffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiifiifffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiifiifffffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiffi(index, a1, a2, a3, a4, a5, a6, a7) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiffi(index, a1, a2, a3, a4, a5, a6, a7);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiffiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiffiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              dynCall_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiiff(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viiiiff(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiffffff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
            var sp = stackSave();
            try {
              dynCall_viiffffff(index, a1, a2, a3, a4, a5, a6, a7, a8);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiif(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              dynCall_viiif(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiffii(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viiffii(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viifff(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              dynCall_viifff(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiiif(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              dynCall_viiiif(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiifffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            var sp = stackSave();
            try {
              return dynCall_iiiiifffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viifffiiff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              dynCall_viifffiiff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_vij(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              dynCall_vij(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiij(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              return dynCall_iiiij(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            var sp = stackSave();
            try {
              return dynCall_iiiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viij(index, a1, a2, a3, a4) {
            var sp = stackSave();
            try {
              dynCall_viij(index, a1, a2, a3, a4);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iij(index, a1, a2, a3) {
            var sp = stackSave();
            try {
              return dynCall_iij(index, a1, a2, a3);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_jii(index, a1, a2) {
            var sp = stackSave();
            try {
              return dynCall_jii(index, a1, a2);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiij(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              dynCall_viiij(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viiji(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              dynCall_viiji(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_viijii(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              dynCall_viijii(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_jiiji(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              return dynCall_jiiji(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiji(index, a1, a2, a3, a4, a5) {
            var sp = stackSave();
            try {
              return dynCall_iiiji(index, a1, a2, a3, a4, a5);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
            var sp = stackSave();
            try {
              return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6);
            } catch (e) {
              stackRestore(sp);
              if (e !== e + 0 && e !== "longjmp")
                throw e;
              _setThrew(1, 0);
            }
          }
          Module["ccall"] = ccall;
          Module["cwrap"] = cwrap;
          Module["FS"] = FS;
          var calledRun;
          function ExitStatus(status) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + status + ")";
            this.status = status;
          }
          dependenciesFulfilled = function runCaller() {
            if (!calledRun)
              run();
            if (!calledRun)
              dependenciesFulfilled = runCaller;
          };
          function run(args) {
            args = args || arguments_;
            if (runDependencies > 0) {
              return;
            }
            preRun();
            if (runDependencies > 0)
              return;
            function doRun() {
              if (calledRun)
                return;
              calledRun = true;
              Module["calledRun"] = true;
              if (ABORT)
                return;
              initRuntime();
              preMain();
              readyPromiseResolve(Module);
              if (Module["onRuntimeInitialized"])
                Module["onRuntimeInitialized"]();
              postRun();
            }
            if (Module["setStatus"]) {
              Module["setStatus"]("Running...");
              setTimeout(function() {
                setTimeout(function() {
                  Module["setStatus"]("");
                }, 1);
                doRun();
              }, 1);
            } else {
              doRun();
            }
          }
          Module["run"] = run;
          function exit(status, implicit) {
            if (implicit && noExitRuntime && status === 0) {
              return;
            }
            if (noExitRuntime) {
            } else {
              ABORT = true;
              EXITSTATUS = status;
              exitRuntime();
              if (Module["onExit"])
                Module["onExit"](status);
            }
            quit_(status, new ExitStatus(status));
          }
          if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
              Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
              Module["preInit"].pop()();
            }
          }
          noExitRuntime = true;
          run();
          return mupdf2.ready;
        };
      }();
      if (typeof exports === "object" && typeof module === "object")
        module.exports = mupdf;
      else if (typeof define === "function" && define["amd"])
        define([], function() {
          return mupdf;
        });
      else if (typeof exports === "object")
        exports["mupdf"] = mupdf;
    }
  });

  // node_modules/mupdf-js/dist/index.js
  var require_dist = __commonJS({
    "node_modules/mupdf-js/dist/index.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
            s = arguments[i2];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
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
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
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
                  if (t[2])
                    _.ops.pop();
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
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createMuPdf = void 0;
      var libmupdf_1 = __importDefault(require_libmupdf());
      function createMuPdf2() {
        return __awaiter(this, void 0, void 0, function() {
          var muPdf;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, libmupdf_1.default()];
              case 1:
                muPdf = _a.sent();
                return [2, wrapMuPdf(muPdf)];
            }
          });
        });
      }
      exports.createMuPdf = createMuPdf2;
      exports.default = createMuPdf2;
      function wrapMuPdf(muPdf) {
        var writeFile = muPdf.FS.writeFile, openDocument = muPdf.openDocument;
        return __assign({ load: function(fileData, name) {
          if (name === void 0) {
            name = generateFileName();
          }
          writeFile(name, fileData);
          return openDocument(name);
        } }, muPdf);
      }
      var i = 0;
      function generateFileName() {
        return "tmp_" + i++ + ".pdf";
      }
    }
  });

  // src/main.ts
  var import_mupdf_js = __toESM(require_dist());
  var PDFUploader = document.getElementById("PDFUploader");
  var PDFContainer = document.getElementById("PDFContainer");
  var mupdf_promise = (0, import_mupdf_js.default)();
  PDFUploader.addEventListener("change", (ev) => {
    ev.preventDefault();
    const file = PDFUploader.files[0];
    loadPDF(file.arrayBuffer());
  });
  async function loadPDF(buf) {
    const mu = await mupdf_promise;
    const buf8 = new Uint8Array(await buf);
    const doc = mu.load(buf8);
    PDFUploader.style.display = "none";
    const numPage = mu.countPages(doc);
    for (var i = 1; i <= numPage; i++) {
      const svg_str = mu.drawPageAsSVG(doc, i).replaceAll("font_", i + "_font_");
      const html_str = mu.drawPageAsHTML(doc, i);
      const svg_div = document.createElement("div");
      svg_div.className = "SvgContainer";
      svg_div.innerHTML = svg_str;
      const page_div = document.createElement("div");
      page_div.className = "PageContainer";
      page_div.id = "page_container_" + i;
      page_div.append(svg_div);
      PDFContainer.appendChild(page_div);
    }
    document.addEventListener("keydown", (ev) => {
      if (ev.key == "PrintScreen")
        document.querySelectorAll(":hover").forEach((div) => {
          if (div.className == "PageContainer")
            handleScreenshot(mu, doc, div);
        });
    });
  }
  async function handleScreenshot(mu, doc, div) {
    const background = document.createElement("div");
    const selection = document.createElement("div");
    background.className = "ScreenshotBackground";
    selection.className = "ScreenshotSelection";
    background.append(selection);
    div.append(background);
    const mouseDownHandler = (ev) => {
      const rect = div.getBoundingClientRect();
      selection.style.left = ev.clientX - rect.left + "px";
      selection.style.top = ev.clientY - rect.top + "px";
      background.removeEventListener("mousedown", mouseDownHandler);
    };
    background.addEventListener("mousedown", mouseDownHandler);
    background.addEventListener("mousemove", (ev) => {
      const rect = div.getBoundingClientRect();
      selection.style.right = rect.right - ev.clientX + "px";
      selection.style.bottom = rect.bottom - ev.clientY + "px";
    });
    background.addEventListener("mouseup", async (ev) => {
      const selection_rect = selection.getBoundingClientRect();
      const background_rect = background.getBoundingClientRect();
      background.remove();
      const page_id = parseInt(div.id.split("_").pop());
      const svg_str = mu.drawPageAsSVG(doc, page_id);
      const svg_lines = svg_str.split("\n");
      const width = parseInt(svg_lines[2].match(/width="\d*/)[0].split('"')[1]);
      const height = parseInt(svg_lines[2].match(/height="\d*/)[0].split('"')[1]);
      const scaleX = width / background_rect.width;
      const scaleY = height / background_rect.height;
      const nvb_arr = [
        Math.floor(scaleX * (selection_rect.left - background_rect.left)),
        Math.floor(scaleY * (selection_rect.top - background_rect.top)),
        Math.ceil(selection_rect.width * scaleX),
        Math.ceil(selection_rect.height * scaleY)
      ];
      download("screenshot.svg", svg_str.replace(`width="${width}pt" height="${height}pt" viewBox="0 0 ${width} ${height}"`, `width="${nvb_arr[2]}pt" height="${nvb_arr[3]}pt" viewBox="${nvb_arr.join(" ")}"`));
    });
  }
  async function loadPDFURL(url) {
    const file = await fetch(url);
    await loadPDF(file.arrayBuffer());
  }
  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  loadPDFURL("sample1.pdf").catch((err) => {
    console.log("Not in Development");
  });
})();
