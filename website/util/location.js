exports.getLocation = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(function(location) {
			resolve([location.coords.latitude, location.coords.longitude])
		}, reject)
	})
}