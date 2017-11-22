if('serviceWorker' in navigator) {

	navigator.serviceWorker
	.register('./service-worker.js', { scope: './' })
	.then(registration => {
		console.log('Registration success', registration)
	}).catch(error => {
		console.log('Registration failed', error)
	})

}