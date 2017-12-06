var cacheVersion = "v2";
var cacheFiles = [
	'./',
	'./index.html',
	'./js/index.js'
]

self.addEventListener('install', (e) => {
	console.log('ServiceWorker installed')

	e.waitUntil(
		caches.open(cacheVersion)
		.then(function(cache) {
			console.log("caching cache files")
			return cache.addAll(cacheFiles)
		})
	)
})

self.addEventListener('activate', (e) => {
	console.log('ServiceWorker activated')
	// change cacheVersion here to see the changes
	e.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thiscache) {
				if(thiscache != cacheVersion) {
					console.log("Serviceworker deleting cache files from "+thiscache)
					return caches.delete(thiscache)
				}
			}))
		})
	)
})

self.addEventListener('fetch', (e) => {
	console.log('ServiceWorker fetching', e.request.url, e)

	e.respondWith(
		caches.match(e.request).then(function(response) {
			if(response) {
				console.log("Serviceworker found in cache", e.request.url);
				return response;
			}
			var requestClone = e.request.clone();
			fetch(requestClone)
			.then(function(response) {
				if(!response) {
					console.log('Serviceworker no response from fetch');
					return response;
				}
				var responseClone = response.clone();
				caches.open(cacheVersion).then(function(cache) {
					cache.put(e.request, responseClone);
					return response;
				})
			}).catch(function(error) {
				console.log('Caught error', error);
			})
		})
		)
})