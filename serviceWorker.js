if('serviceWorker' in navigator){
  try {
    navigator.serviceWorker.register('serviceWorker.js');
    console.log("Service Worker Registered");
  } catch (error) {
    console.log("Service Worker Registration Failed");
  }
}

const listToCache = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './images/travellogLogo.png'
]

self.addEventListener('install', async event=>{
  const cache = await caches.open('static-cache');
  cache.addAll(listToCache);
});

self.addEventListener('activate', pEvent => {
  console.log('서비스워커 동작 시작됨');
});

// self.addEventListener('fetch', pEvent => {
//       pEvent.respondWith(
//           caches.match(pEvent.request)
//           .then(response => {
//               if(!response){
//                   console.log("네트워크로 데이터 요청!", pEvent.request)
//                   return fetch(pEvent.request)
//               }
//               console.log("캐시에서 데이터 요청!", pEvent.request)
//               return response;
//           }).catch(err => console.log(err))
//       );
//   });
