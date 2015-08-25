var React = require('react')
  , GeoPoint = require('geopoint')
  , SpurMap = require('../common/spur-map')
  , Image = require('../common/image')
  , View = require('../common/view')
  , locationUtil = require('../../util/location')

var styles = {}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			location: {
				coords:[]
			},
			bounds: [],
			zoom: 13
		}
	}
	componentDidMount() {
		locationUtil.getLocation().then((coords) => {
			var point = new GeoPoint(coords[0], coords[1])
			  , boundingCoords = point.boundingCoordinates(50) 

			var bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(boundingCoords[0].latitude(), boundingCoords[0].longitude()),
				new google.maps.LatLng(boundingCoords[1].latitude(), boundingCoords[1].longitude())
			)

			this.setState({ location: { coords }, bounds })
		})
	}
	changeLocation(e) {
		if(!e.target.value) return locationUtil.getLocation().then((coords) => {
			this.setState({ location: { coords }, zoom: 13 })
		})

		var geocoder = new google.maps.Geocoder()
		  , location = []

		geocoder.geocode( { 'address': e.target.value, bounds: this.state.bounds }, (results, status) => {
			if(status == google.maps.GeocoderStatus.OK)
				location = locationUtil.getAddressComponents(results[0])
			else
				location = { coords:[] }

			this.setState({ address: results[0].formatted_address, location, zoom: 17 })
		})
	}
	changeInput(e) {
		this.setState({ address: e.target.value })
	}
	render() {
		var location = this.state.location
		  , { name, ...props } = this.props
		return (
			<View>
				<input {...props} type="text" value={this.state.address} onChange={this.changeInput.bind(this)} onBlur={this.changeLocation.bind(this)} />
				<SpurMap coords={location.coords} zoom={this.state.zoom} />
				<input type="hidden" name={name+'[name]'} value={location.name} />
				<input type="hidden" name={name+'[street]'} value={location.street} />
				<input type="hidden" name={name+'[citystatezip]'} value={location.citystatezip} />
				<input type="hidden" name={name+'[coords][0]'} value={location.coords[0]}  />
				<input type="hidden" name={name+'[coords][1]'} value={location.coords[1]}  />
			</View>
		)
	}
}

module.exports = LocationInput