const CACHE_NAME='goods-receipt-v1';
const ASSETS=['./index.html','./manifest.webmanifest','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{const r=e.request; if(ASSETS.some(a=>r.url.endsWith(a.replace('./','')))){e.respondWith(caches.match(r).then(x=>x||fetch(r)));} else {e.respondWith(fetch(r).catch(()=>caches.match('./index.html')));} });