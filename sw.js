const cacheName = "v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/js/main.js",
  "/img/logo.svg",
  "/icons/",
  "/safari-pinned-tab.svg",
];

self.addEventListener("install", (event) => {
  // fires when the browser installs the app
  // here we're just logging the event and the contents
  // of the object passed to the event. the purpose of this event
  // is to give the service worker a place to setup the local
  // environment after the installation completes.
  console.log(`Event fired: ${event.type}`);
  console.dir(event);
  event.waitUntil(
    // waitUntil tells the browser to wait for this to finish
    caches
      .open(cacheName) //caches is a global object representing CacheStorage
      .then((cache) => {
        // open the cache with the name cacheName*
        return cache.addAll(urlsToCache); // pass the array of URLs to cache**
      })
  );
});

self.addEventListener("activate", (event) => {
  // fires after the service worker completes its installation.
  // It's a place for the service worker to clean up from previous
  // service worker versions
  console.log(`Event fired: ${event.type}`);
  console.dir(event);
});

self.addEventListener("fetch", (event) => {
  // Fires whenever the app requests a resource (file or data)
  // normally this is where the service worker would check to see
  // if the requested resource is in the local cache before going
  // to the server to get it. There's a whole chapter in the book
  // covering different cache strategies, so I'm not going to say
  // any more about this here
  console.log(`Fetching ${event.request.url}`);
  // console.dir(event.request);
  // Next, go get the requested resource from the network,
  // nothing fancy going on here.
  //event.respondWith(fetch(event.request));

  /*
  event.respondWith( ( async() => {
               	const response = await caches.match( event.request);
               	return response || fetch( event.request );          
               })()
  );
  */

  event.respondWith(
    (async () => {
      try {
        const res = await caches.match(event.request);
        console.log("res", res);
        console.log(
          `[Service Worker] using cached resource: ${event.request.url}`
        );
        if (res) {
          // if found return the cache but also make a fetch to update cache for next time
          fetch(event.request).then(async (response) => {
            // we don't wait for this to finish
            const cache = await caches.open(cacheName);
            console.log(
              `[Service Worker] Caching new resource: ${event.request.url}`
            );
            cache.put(event.request, response.clone());
          });
          return res;
        } else {
          // if not found in the cache, make a fetch ,push the response to cache and then return
          const response = await fetch(event.request);
          const cache = await caches.open(cacheName);
          console.log(
            `[Service Worker] Caching new resource: ${event.request.url}`
          );
          cache.put(event.request, response.clone());
          return response;
        }
      } catch (err) {
        console.error(err);
      }
    })()
  );
});
