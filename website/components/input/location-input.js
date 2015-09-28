var React = require('react')
  , GoogleMap = require('../map/google-map')
  , GoogleMapMarker = require('../map/google-map-marker')
  , PlaceInput = require('./place-input')
  , Input = require('../core/input')
  , View = require('../core/view')
  , locationUtil = require('../../util/location')

var styles = {}

styles.container = {
	borderWidth:1,
	borderColor:'#ccc'
}

styles.nameInput = {
	borderWidth:0,
	borderBottomColor:'#eee',
	borderBottomWidth:1,
	paddingTop:5,
	paddingBottom:3
}

styles.addressInput = {
	...Input.style,
	borderWidth:0,
}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			place: props.place,
			zoom: props.zoom
		}
	}
	changePlace(place) {
		this.setState({ place, zoom: 18 })
		this.props.onChange && this.props.onChange(place)
	}
	setCoords(coords) {
		this.state.place.coords = coords
		this.setState({ place:this.state.place })

		locationUtil.getAddressFromCoords(coords).then(address => {
			return locationUtil.getAddressComponents(address)
		}).then(place => {
			place.coords = coords
			this.setState({ place })
		}).catch(window.alert)
	}
	render() {
		var place = this.state.place
		  , name = this.props.name
		  , address = place && place.full

		return (
			<View style={styles.container}>
				<PlaceInput style={styles.addressInput} value={address} onChange={this.changePlace.bind(this)} location={this.props.location} />
				{place && <GoogleMap center={place.coords} zoom={this.state.zoom}>
					<GoogleMapMarker draggable={true} position={place.coords} onDragEnd={this.setCoords.bind(this)} />
				</GoogleMap>}
				{place &&<input type="hidden" name={name+'[street]'} value={place.street} />}
				{place &&<input type="hidden" name={name+'[citystatezip]'} value={place.citystatezip} />}
				{place &&<input type="hidden" name={name+'[coords][0]'} value={place.coords[0]}  />}
				{place &&<input type="hidden" name={name+'[coords][1]'} value={place.coords[1]}  />}
			</View>
		)
	}
}

module.exports = LocationInput