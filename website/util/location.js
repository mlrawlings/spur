var GeoPoint = require('geopoint')
  , userLocation = 

exports.getLocation = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(function(location) {
			resolve([location.coords.latitude, location.coords.longitude])
		}, reject)
	})
}

exports.getDistanceBetween = function(coords1, coords2, inKilometers) {
	var start = new GeoPoint(coords1[0], coords1[1])
	  , end = new GeoPoint(coords2[0], coords2[1])
	  , distance = start.distanceTo(end, inKilometers)

	return distance.toFixed(1) + ' ' + (inKilometers ? 'km' : 'miles')
}

exports.getAddressFromCoords = function(coords) {

}

exports.getAddressFromCoords = function(coords) {
	
}

exports.getAddressComponents = function(data) {
	var address = {}
	  , components = {}

	data.address_components.forEach(function(component) {
		component.types.forEach(function(type) {
			components[type] = component.short_name
		})
	})

	if(components.street_number && components.route) {
		address.street = components.street_number + ' ' + components.route
	} else {
		address.street = components.route || ''
	}

	address.citystatezip = components.locality + ', ' + components.administrative_area_level_1 + ' ' + components.postal_code
	
	address.coords = data.geometry.location.toUrlValue().split(',').map(function(val) {
		return parseFloat(val)
	})

	return address
}