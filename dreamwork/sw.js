/* Dream Log service worker
   Makes the dream log work fully offline once it has been opened once,
   and lets iOS keep it on the Home Screen like an app.

   Bump CACHE_VERSION whenever you change any of the files below, so
   phones pick up the new version on the next online visit. */

var CACHE_VERSION = 'dream-log-v1';

/* Paths are relative to this file (the dreamwork/ folder), so they work
   whether the site is served from a domain root or a /witchythings/ subpath. */
var SHELL = [
  './',
  './dream-log.html',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      return cache.addAll(SHELL);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE_VERSION) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var req = event.request;
  if(req.method !== 'GET') return;

  /* For page navigations, serve the dream log even with no connection. */
  if(req.mode === 'navigate'){
    event.respondWith(
      fetch(req).catch(function(){
        return caches.match('./dream-log.html').then(function(r){
          return r || caches.match('./');
        });
      })
    );
    return;
  }

  /* For everything else, try cache first, then network, and quietly
     refresh the cache in the background when online. */
  event.respondWith(
    caches.match(req).then(function(cached){
      var live = fetch(req).then(function(resp){
        if(resp && resp.status === 200 && resp.type === 'basic'){
          var copy = resp.clone();
          caches.open(CACHE_VERSION).then(function(c){ c.put(req, copy); });
        }
        return resp;
      }).catch(function(){ return cached; });
      return cached || live;
    })
  );
});
