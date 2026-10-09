self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('farming-sim-v1').then((cache) => {
            return cache.addAll([
                './index.html',
                './style.css',
                './main.js',
                './game.js',
                './world.js',
                './player.js',
                './vehicles.js',
                './farming.js',
                './economy.js',
                './shop.js',
                './save-system.js',
                './touch-controls.js',
                'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
