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

exports.getAddressComponents = function(data) {
	var address = {}
	  , components = {}

	data.address_components.forEach(function(component) {
		if(component.types.indexOf('establishment') != -1) {
			components.name = component.short_name
		}
		if(component.types.indexOf('street_number') != -1) {
			components.number = component.short_name
		}
		if(component.types.indexOf('route') != -1) {
			components.street = component.short_name
		}
		if(component.types.indexOf('locality') != -1) {
			components.city = component.short_name
		}
		if(component.types.indexOf('administrative_area_level_1') != -1) {
			components.state = component.short_name
		}
		if(component.types.indexOf('postal_code') != -1) {
			components.zip = component.short_name
		}
		if(component.types.indexOf('country') != -1) {
			components.country = component.short_name
		}
	})

	address.name = components.name || components.street
	address.street = components.number + ' ' + components.street
	address.citystatezip = components.city + ', ' + components.state + ' ' + components.zip
	address.coords = data.geometry.location.toUrlValue().split(',').map(function(val) {
		return parseFloat(val)
	})

	return address
}