var React = require('react')
  , GeoPoint = require('geopoint')
  , GoogleMap = require('google-map-react')
  , View = require('../common/view')
  , locationUtil = require('../../util/location')

var style = {}

style.googleMap = {
	height: '10em',
	width: '100%'
}

style.input = {

}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			location: [],
			bounds: [],
			zoom: 13
		}
	}
	componentDidMount() {
		locationUtil.getLocation().then((location) => {
			var point = new GeoPoint(location[0], location[1])
			  , coords = point.boundingCoordinates(50) 

			var bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(coords[0].latitude(), coords[0].longitude()),
				new google.maps.LatLng(coords[1].latitude(), coords[1].longitude())
			)

			this.setState({ location, bounds })
		})
	}
	changeLocation(e) {
		if(!e.target.value) return locationUtil.getLocation().then((location) => {
			this.setState({ location, zoom: 13 })
		})

		var geocoder = new google.maps.Geocoder()
		  , location = []

		geocoder.geocode( { 'address': e.target.value, bounds: this.state.bounds }, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK)
				location = results[0].geometry.location.toUrlValue().split(',').map(function(val) {
					return parseFloat(val)
				})
			else
				location = []

			console.log(location)

			this.setState({ address: results[0].formatted_address, location, zoom: 17 })
		})
	}
	changeInput(e) {
		this.setState({ address: e.target.value })
	}
	render() {
		return (
			<View>
				<input {...this.props} type="text" value={this.state.address} onChange={this.changeInput.bind(this)} onBlur={this.changeLocation.bind(this)} />
				<View style={style.googleMap}>
					<GoogleMap center={this.state.location} zoom={this.state.zoom}>
						<View lat={this.state.location[0]} lng={this.state.location[1]}>
							Text
						</View>
					</GoogleMap>
				</View>
			</View>
		)
	}
}

module.exports = LocationInput