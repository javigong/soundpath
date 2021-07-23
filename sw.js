const cacheName = "v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/js/main.js",
  "/index.html?source=pwa",
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
    caches.open(cacheName).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
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
  event.respondWith(
    event.respondWith(async (event) => {
      const response = await caches.match(event.request);
    })
  );
});
