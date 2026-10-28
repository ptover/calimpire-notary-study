const cacheName='calimpire-phone-v3';
const base='/calimpire-notary-study/';
const assets=[base,`${base}index.html`,`${base}styles.css`,`${base}app.js`,`${base}questions.js`,`${base}manifest.webmanifest`,`${base}assets/icon-192.png`,`${base}assets/icon-512.png`,`${base}assets/apple-touch-icon.png`];
self.addEventListener('install',event=>event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(assets)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==cacheName).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(cacheName).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(base))))});
