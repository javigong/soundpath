/*************************************************
  
  🎯Installing Service Worker
  🎯Activating Service Worker
  🎯Creating Static and Dynamic Caches
  🎯Adding files to the Static and Dynamic Caches

*************************************************/

const staticCacheName = 'site-static-v1'; // <---- Name of our Static Cache (basically the name of the'box'where we will store the files that WE WANT ALWAYS to present to our user while the connection is offline).We can name it however we want but it is good practice to add a version at the end.

const dynamicCache = 'site-dynamic-v1'; // <---- Name of our Dynamic Cache (basically the name of the'box'where we will store the files that THE USER has AT LEAST ONCE shown interest in accessing when he was online).We can name it however we want but it is good practice to add a version at the end.

const assets = [ // <-------- The PATHS and URLs to our files that we want to store in our Static Cache (basically our 'app shell')
	'/',   // <----- This is necessary in order to access the files from the root.
	'/index.html', // <--- name of our landing/homepage file for the website/app.
	'/js/app.js', // <--- name of our Service Woker Registration File.
	'/js/ui.js', // <--- An example of JavaScript file to link.
	'/js/materialize.min.js', // <---  The JavaScript file from the 'MATERIALIZE' Library.
	'/css/styles.css', // <--- An example of CSS file to link.
	'/css/materialize.min.css', // <--- The CSS file from the 'MATERIALIZE' Library.
	'/img/dish.png', // <--- An example of an image to link.
	'https://fonts.googleapis.com/icon?family=Material+Icons', // <--- The Material Icon fonts. 
  'https://fonts.gstatic.com/s/materialicons/v90/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', // <--- The URL for the icons of the Material-Icon (* Worth to mention that this URL was found inside the Material Icon fonts under the property 'src'
  '/pages/fallback.html' // <--- The HTML page that we want to display to the user whenever he tries to access a page while offline and the assets/files can't be found in any Cache (static or dynamic)
];

//=============================
// What the code below will do:

/* It will -INSTALL- Service Worker. */
/* It will open a Cache with the name of 'staticCacheName'.*/
/* It will store inside this Cache ALL of our assets.*/

self.addEventListener('install', (evt) =>{
evt.waitUntil(
caches.open(staticCacheName).then(cache =>{
	cache.addAll(assets);
	  })
  );
});

//=============================
// What the code below will do:

/* It will -ACTIVATE- service worker. */
/* It will delete the old caches (our older versions of caches) from the user's machine if the name of these old caches DO NOT match with the name of our most current and updated caches' names.  */

self.addEventListener('activate', (evt)=>{
  evt.waitUntil(
    caches.keys().then(keys => {
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key!== dynamicCache)
          .map(key => caches.delete(key))
          )
    })
  )
});

//=====================
// What the code below will do:

/* It will implement the logic of our caching strategy:
1- Listens for a browser/app request, intercepts the request and see if such request can be met either through the:
  1.1 Static Cache
  1.2 Dynamic Cache
  1.3 Server

2- If the request cannot be satisfied with any resource inside the Static Cache, Dynamic Cache and cannot continue to the server (the user is offline)then this 'failed' request will be served with our 'fallback' page.

So it is suggested that you create a fallback page on your own to serve it for the user.
*/

self.addEventListener('fetch', (evt)=>{
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request).then(fetchRes =>{
        return caches.open(dynamicCache).then(cache =>{
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => caches.match('/pages/fallback.html'))
  );
});
