var GeoPoint = require('geopoint')

var locationInput = document.querySelector('[name="location"]')
  , mapElement = document.getElementById('map')
  , mapCover = document.getElementById('mapCover')
  , bounds
  , marker
  , map

initMap().then(function(location) {
	var point = new GeoPoint(location.lat, location.lng)
	  , coords = point.boundingCoordinates(50) 

	bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(coords[0].latitude(), coords[0].longitude()),
		new google.maps.LatLng(coords[1].latitude(), coords[1].longitude())
	)
})

locationInput.addEventListener('blur', getLatLong)

function getLatLong(e) {
	if(!e.target.value) return

	var geocoder = new google.maps.Geocoder()
	  , location = []

	geocoder.geocode( { 'address': e.target.value, bounds:bounds }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK)
			location = results[0].geometry.location.toUrlValue().split(',')
		else
			location = "Unable to find address: " + status

		try {
			locationInput.value = results[0].formatted_address
			locationInput.style.border = '1px solid #aaa'

			map.setZoom(17)
			map.setCenter(results[0].geometry.location)
			marker.setVisible(true)
			marker.setPosition(results[0].geometry.location)
			mapCover.style.display = 'none'
		} catch(e) {
			locationInput.style.border = '1px solid #c00'
			mapCover.style.display = 'block'
		}
	})
}

function initMap() {
	return getLocation().then(function(location) {
		map = new google.maps.Map(mapElement, {
			zoom: 13,
			center: location,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		})

		marker = new google.maps.Marker({
			map: map,
			position: location,
			visible: false
		})

		return location
	})
}

function getLocation() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(function(location) {
			resolve({ lat: location.coords.latitude, lng: location.coords.longitude })
		}, reject)
	})
}