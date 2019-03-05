var dataCacheName = 'wonder-editor';
var cacheName = 'wonder-editor-cache-1.0.0-beta.3.1';
var filesToCache = [
    './',
    './index.html',
    './manifest.json',
    './dist/index.js',
    './config/engine/render/shader/shader_libs.json',
    './config/engine/render/shader/shaders.json',
    './config/engine/no_worker/pipeline/loop_pipelines.json',
    './config/engine/no_worker/pipeline/init_pipelines.json',
    './config/engine/no_worker/job/loop_jobs.json',
    './config/engine/no_worker/job/init_jobs.json',
    './config/engine/setting.json',
    './config/editor/setting.json',
    './config/engine/no_worker/setting/setting.json',
    './public/font/empty.png',
    './public/font/empty.fnt',
    './public/logo/favicon.ico',
    './public/logo/logo.png',
    './public/img/debug.png',
    './public/img/error.png',
    './public/img/info.png',
    './public/img/log.png',
    './public/img/warn.png',
    './public/img/more.png',
    './public/img/null.png',
    './public/img/wdb.png',
    './public/img/mat.png',
    './public/img/assetPackage.png',
    './public/img/close.png',
    './public/img/select.png',
    './public/img/remove.png',
    './public/img/clone.png',
    './public/img/add.png',
    './public/img/right.png',
    './public/img/down.png',
    './public/img/notRemove.png',
    './public/img/notClone.png',
    './public/img/package.png',
    './public/img/load.png',
    './public/img/color.png',
    './public/img/run.png',
    './public/img/stop.png',
    './public/img/sun.png',
    './public/img/camera.png',
    './public/img/texture.png',
    './public/img/point.png',
    './public/img/rotation.png',
    './public/img/scale.png',
    './public/img/translation.png',
    './public/css/index.css'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    // console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if (e.request.url.indexOf(dataUrl) > -1) {
        /*
         * When the request URL contains dataUrl, the app is asking for fresh
         * weather data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        e.respondWith(
            caches.open(dataCacheName).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});
