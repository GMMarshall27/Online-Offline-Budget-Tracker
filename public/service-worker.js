const { request, response } = require("express");

var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

var filesToCache = [
    "/",
    "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
           return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function(event){
    if(event.request.url.includes("/api")){
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(event.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(event.request.url, response.clone());
                    }
                    return response;
                })
                .catch(err => {
                    return cache.match(event.request);
                });
            }).catch(err => console.log(err))
        );
        return;
    }
})