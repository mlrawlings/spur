var GeoPoint = require('geopoint')
  , request = require('superagent')
  , geocoder

exports.getLocation = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(function(location) {
			var coords = [location.coords.latitude, location.coords.longitude]
			exports.getAddressFromCoords(coords).then(function(address) {
				resolve({ name:address.street, coords })
			}).catch(reject)
		}, reject)
	})
}

exports.getLocationFromIp = function(ip) {
	return new Promise(function(resolve, reject) {
		request('http://www.telize.com/geoip/'+ip).end(function(err, response) {
			if(err) return reject(err)
			resolve({
				name:response.body.city +', ' + response.body.region_code,
				coords:[response.body.latitude, response.body.longitude]
			})
		})
	})
}

exports.getDistanceBetween = function(coords1, coords2, inKilometers) {
	var start = new GeoPoint(coords1[0], coords1[1])
	  , end = new GeoPoint(coords2[0], coords2[1])
	  , distance = start.distanceTo(end, inKilometers)

	return distance.toFixed(1) + ' ' + (inKilometers ? 'km' : 'miles')
}

exports.getBounds = function(coords, radius) {
	var point = new GeoPoint(coords[0], coords[1])
	  , boundingCoords = point.boundingCoordinates(radius) 

	return [
		[boundingCoords[0].latitude(), boundingCoords[0].longitude()], 
		[boundingCoords[1].latitude(), boundingCoords[1].longitude()]
	]
}

exports.toGoogleLatLng = function toGoogleLatLng(coords) {
	return new google.maps.LatLng(coords[0], coords[1])
}

exports.toGoogleLatLngBounds = function toGoogleLatLngBounds(bounds) {
	return new google.maps.LatLngBounds(
		exports.toGoogleLatLng(bounds[0]), 
		exports.toGoogleLatLng(bounds[1])
	)
}

exports.getAddressFromSearch = function(search, bounds, multiple) {
	return new Promise(function(resolve, reject) {
		geocoder = geocoder || new google.maps.Geocoder()

		geocoder.geocode( { address:search, bounds:exports.toGoogleLatLngBounds(bounds) }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					resolve(multiple ? results : results[0])
				} else {
					if(multiple) resolve([])
					else reject('No results found')
				}
			} else {
				reject('Geocoder failed due to: ' + status)
			}
		})
	})
}

exports.getAddressFromCoords = function(coords) {
	return new Promise(function(resolve, reject) {
		geocoder = geocoder || new google.maps.Geocoder()

		geocoder.geocode({ location:exports.toGoogleLatLng(coords) }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					resolve(exports.getAddressComponents(results[0]))
				} else {
					reject('No results found')
				}
			} else {
				reject('Geocoder failed due to: ' + status)
			}
		})
	})
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

	address.full = data.formatted_address

	return address
}