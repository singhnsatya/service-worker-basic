if('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('./service-worker.js', { scope: './' })
	.then(registration => {
		console.log('Registration success', registration)
	}).catch(error => {
		console.log('Registration failed', error)
	})
}

var get = function(url) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function() {
			if(xhr.readyState === XMLHttpRequest.DONE) {
				if(xhr.status === 200) {
					var result = xhr.responseText
					console.log('res-= - - ', result)
					// result = JSON.parse(result)
					resolve(result)
				} else {
					reject(xhr)
				}
			}
		}
		xhr.open("GET", url, true)
		xhr.send()
	})
}

get("http://photopin.com/free-photos/tesla")
.then(function(response) {
	console.log("success");
	var dc = document.getElementById('targetImage')
	if(dc != null) {
	dc.src = response.url;
}
}).catch(function(err) {
	console.log('err', err)
})