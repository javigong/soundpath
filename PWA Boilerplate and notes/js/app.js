
/*************************************************
  
  🎯This file is for registering the Service Worker(SW)
  🎯Make sure to link this file to EVERY SINGLE HTML file

*************************************************/

if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/sw.js')
	.then((reg) => console.log('service worker registered', reg))
	.catch((err)=> console.log('service worker not registerd', err))
}






 