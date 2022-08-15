Module.noExitRuntime = true;

Module.locateFile = function (path, prefix) {
    return prefix + "wasm/" + path;
};