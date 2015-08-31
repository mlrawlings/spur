var React = require('react')
  , GeoPoint = require('geopoint')
  , AutoSuggest = require('react-autosuggest')
  , GoogleMap = require('../common/google-map')
  , GoogleMapMarker = require('../common/google-map-marker')
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
		this.geocoder = new google.maps.Geocoder()

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
	changeLocation(result) {
		this.setState({ location:locationUtil.getAddressComponents(result), zoom: 17 })
	}
	getSuggestions(value, fn) {
		this.geocoder.geocode( { 'address':value, bounds:this.state.bounds }, (results, status) => {
			fn(null, (results || []))
		})
	}
	getSuggestionValue(result) {
		return result.formatted_address
	}
	setCoords(coords) {
		this.state.location.coords = coords
		this.setState({ location:this.state.location })
		
		this.geocoder.geocode({ location:new google.maps.LatLng(coords[0], coords[1]) }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var location = locationUtil.getAddressComponents(results[0])

					location.coords = coords

					this.setState({ location })
					this.refs.autosuggest.setState({ value:results[0].formatted_address })
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		});
	}
	render() {
		var location = this.state.location
		  , { name, ...props } = this.props
		  , inputProps = { ...props, value:this.state.address }

		return (
			<View>
				<AutoSuggest
					ref="autosuggest"
					inputAttributes={inputProps} 
					suggestions={this.getSuggestions.bind(this)} 
					suggestionValue={this.getSuggestionValue.bind(this)}
					suggestionRenderer={this.getSuggestionValue.bind(this)}
					onSuggestionSelected={this.changeLocation.bind(this)} />
				<GoogleMap center={location.coords} zoom={this.state.zoom}>
					{location.coords && location.coords.length && 
						<GoogleMapMarker draggable={true} position={location.coords} onDragEnd={this.setCoords.bind(this)} />
					}
				</GoogleMap>
				<input type="hidden" name={name+'[street]'} value={location.street} />
				<input type="hidden" name={name+'[citystatezip]'} value={location.citystatezip} />
				<input type="hidden" name={name+'[coords][0]'} value={location.coords[0]}  />
				<input type="hidden" name={name+'[coords][1]'} value={location.coords[1]}  />
			</View>
		)
	}
}

module.exports = LocationInput