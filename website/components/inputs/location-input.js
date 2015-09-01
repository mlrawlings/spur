var React = require('react')
  , GeoPoint = require('geopoint')
  , AutoSuggest = require('react-autosuggest')
  , GoogleMap = require('../common/google-map')
  , GoogleMapMarker = require('../common/google-map-marker')
  , Image = require('../common/image')
  , View = require('../common/view')
  , locationUtil = require('../../util/location')

var styles = {}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		var location = this.props.location
		
		this.state = {
			location: {
				coords:location.coords
			},
			bounds: locationUtil.getBounds(location.coords, 50),
			zoom: 13
		}
	}
	changeLocation(result) {
		this.setState({ location:locationUtil.getAddressComponents(result), zoom: 17 })
	}
	getSuggestions(value, fn) {
		locationUtil.getAddressFromSearch(value, this.state.bounds, true).then((results) => {
			fn(null, results)
		})
	}
	getSuggestionValue(result) {
		return result.formatted_address
	}
	setCoords(coords) {
		this.state.location.coords = coords
		this.setState({ location:this.state.location })

		locationUtil.getAddressFromCoords(coords).then((address) => {
			address.coords = coords
			this.setState({ location:address })
			this.refs.autosuggest.setState({ value:address.full })
		}).catch(window.alert)
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
					<GoogleMapMarker draggable={true} position={location.coords} onDragEnd={this.setCoords.bind(this)} />
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