const addResourcesToCache = async (resources: string[]) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};
  
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      //"/main.js",
      //"/worker.js",
      //"/sw.js",
      //"/wasm/libmupdf.wasm"
    ])
  );
});

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    return fetch(request);
};
  
self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});