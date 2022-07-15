Module.noExitRuntime = true;

Module.locateFile = function (path, prefix) {
    return window.location.href + "wasm/libmupdf.wasm"
};