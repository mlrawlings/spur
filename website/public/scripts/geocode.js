var locationInput = document.querySelector('[name="location"]')
  , mapElement = document.getElementById('map')
  , mapCover = document.getElementById('mapCover')

function getLatLong(e) {
	var geocoder = new google.maps.Geocoder()
	  , location = []

	geocoder.geocode( { 'address': e.target.value }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK)
	    	location = results[0].geometry.location.toUrlValue().split(',')
	    else
	    	location = "Unable to find address: " + status

	    try {
	    	locationInput.value = results[0].formatted_address
	    	locationInput.style.border = '1px solid #aaa'
	    	locationInput.style.color = 'black'

	    	var myOptions = {
				zoom: 16,
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			var map = new google.maps.Map(mapElement, myOptions);

			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			})

			mapCover.style.display = 'none'

	    } catch(e) {
	    	locationInput.style.border = '1px solid #c00'
	    	locationInput.style.color = '#c00'
			mapCover.style.display = 'block'
	    }
	    
    })
}

locationInput.addEventListener('blur', getLatLong)