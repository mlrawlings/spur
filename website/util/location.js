var qs = require('qs')
  , GeoPoint = require('geopoint')
  , placeAutocompleteService
  , placeService
  , geocoder

const MAX_RESULTS = 6

exports.getLocation = function() {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(function(location) {
			var coords = [location.coords.latitude, location.coords.longitude]
			exports.getAddressFromCoords(coords).then(function(address) {
				resolve(exports.getAddressComponents(address))
			}).catch(reject)
		}, reject)
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
	return coords.google || new google.maps.LatLng(coords[0], coords[1])
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
				if(results[0]) {
					resolve(results[0])
				} else {
					reject('No results found')
				}
			} else {
				reject('Geocoder failed due to: ' + status)
			}
		})
	})
}

exports.getResultsFromSearch = function(input, near) {
	var bounds = near && exports.toGoogleLatLngBounds(exports.getBounds(near, 20))
	  , searches = [exports.placeSearch, exports.placesAutocomplete]

	//perhaps also search without the partial term.  only if no results?
	return exports.searchMultiple(searches, input, bounds).then(results => 
		Promise.all(
			results.map(result => 
				result && result.formatted_address && result.address_components 
					? result 
					: exports.getPlace(result.place_id).catch(()=>null)
			)
		)
	).then(results =>
		results.filter(result => result && result.geometry)
	).then(results => {
		var terms = input.toLowerCase().replace(/[^\w\s]/g, '').replace(/[_\s]+/g, ' ').split(' ')
		results = results.filter((result) => {
			return !!result.geometry
		}).sort((a, b) => {
			var aScore = 0
			  , bScore = 0
			  , aAddress = a.formatted_address.toLowerCase().replace(/[^\w\s]/g, '').replace(/[_\s]+/g, ' ')
			  , bAddress = b.formatted_address.toLowerCase().replace(/[^\w\s]/g, '').replace(/[_\s]+/g, ' ')
			  , aName = a.name ? a.name.toLowerCase().replace(/[^\w\s]/g, '').replace(/[_\s]+/g, ' ') : ''
			  , bName = b.name ? b.name.toLowerCase().replace(/[^\w\s]/g, '').replace(/[_\s]+/g, ' ') : ''

			if(bounds && bounds.contains(a.geometry.location)) {
				aScore += 10
			}
			if(bounds && bounds.contains(b.geometry.location)) {
				bScore += 10
			}
			terms.forEach((term) => {
				if(aAddress.indexOf(term) != -1) {
					aScore++
				}
				if(bAddress.indexOf(term) != -1) {
					bScore++
				}
				if(aName.indexOf(term) != -1) {
					aScore+=2
				}
				if(bName.indexOf(term) != -1) {
					bScore+=2
				}
			})
			if((a.types||[]).indexOf('locality') != -1) {
				aScore--
			}
			if((b.types||[]).indexOf('locality') != -1) {
				bScore--
			}
			if(near && aScore == bScore) {
				var aPoint = new GeoPoint(a.geometry.location.lat(), a.geometry.location.lng())
				  , bPoint = new GeoPoint(a.geometry.location.lat(), a.geometry.location.lng())
				  , mePoint = new GeoPoint(near[0], near[1])

				if(aPoint.distanceTo(mePoint) < bPoint.distanceTo(mePoint)) {
					aScore++
				} else {
					bScore++
				}
			}
			a.score = aScore
			b.score = bScore
			return bScore - aScore
		})

		return results.slice(0, MAX_RESULTS).map(exports.getAddressComponents)
	})
}

exports.searchMultiple = function(searches, input, bounds) {
	if(!searches.length) return []

	return searches[0](input, bounds).then((results) => {
		if(searches.length == 1) return results

		return exports.searchMultiple(searches.slice(1), input, bounds).then((additionalResults) => {
			return exports.mergeResults(results, additionalResults)
		})
	})
}

exports.mergeResults = function(resultsA, resultsB) {
	var results = [].concat(resultsA)
	
	resultsB.forEach((b) => {
		resultsA.every(a => a.place_id != b.place_id) && results.push(b)
	})
	
	return results
}

var completions = {}
exports.placesAutocomplete = function(input, bounds) {
	return new Promise(function(resolve, reject) {
		if(completions[input]) return resolve(completions[input])

		placeAutocompleteService = placeAutocompleteService || new google.maps.places.AutocompleteService()

		placeAutocompleteService.getPlacePredictions({ input, bounds }, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				Promise.all(
					results.slice(0, 4).map(result =>
						exports.getPlace(result.place_id).catch(()=>null)
					)
				).then(results =>
					results.filter(result => result && result.geometry)
				).then(results => {
					completions[input] = results
					resolve(results)
				})
			} else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
				resolve([])
			} else {
				reject('Places Text Search failed due to: ' + status)
			}
		})
	})
}

var searches = {}
exports.placeSearch = function(query, bounds) {
	return new Promise(function(resolve, reject) {
		if(searches[query]) return resolve(searches[query])

		placeService = placeService || new google.maps.places.PlacesService(document.createElement('div'))

		placeService.textSearch({ bounds, query }, (results, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				searches[query] = results.slice(0, 4)
				resolve(results.slice(0, 4))
			} else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
				resolve([])
			} else {
				reject('Places Text Search failed due to: ' + status)
			}
		})
	})
}

var places = {}
exports.getPlace = function(placeId) {
	return new Promise(function(resolve, reject) {
		if(places[placeId]) return resolve(places[placeId])

		placeService = placeService || new google.maps.places.PlacesService(document.createElement('div'))

		placeService.getDetails({ placeId }, (result, status) => {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				places[placeId] = places[result.place_id] = result
				resolve(result)
			} else {
				reject('Place Details failed due to: ' + status)
			}
		})
	})
}

exports.getAddressComponents = function(place) {
	var address = {}
	  , components = {}

	place.address_components.forEach(function(component) {
		component.types.forEach(function(type) {
			components[type] = component.short_name
		})
	})

	if(place.name && place.name.indexOf(components.route) == -1) {
		address.name = place.name
	}

	if(components.street_number && components.route) {
		address.street = components.street_number + ' ' + components.route
	} else {
		address.street = components.route || ''
	}

	address.citystatezip = (components.locality || components.sublocality || components.neighborhood) + ', ' + components.administrative_area_level_1 + ' ' + (components.postal_code||'')
	
	address.coords = place.geometry.location.toUrlValue().split(',').map(function(val) {
		return parseFloat(val)
	})

	address.coords.google = place.geometry.location

	address.full = (address.street && address.street + ', ') + address.citystatezip

	address.id = place.place_id

	return address
}

exports.getMapImageUrl = function(location, width, height) {
	location = location.coords || location
	width = width || 600
	height = height || 315

	var locationString = location[0]+','+location[1]

	return 'https://maps.googleapis.com/maps/api/staticmap?' + qs.stringify({
		center:locationString,
		size:width+'x'+height,
		scale:2,
		maptype:'roadmap',
		markers:locationString
	})
}