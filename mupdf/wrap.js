Module.noExitRuntime = true;

Module.locateFile = function (path, prefix) {
    console.log(prefix + "wasm/" + path)
    return prefix + "wasm/" + path;
};