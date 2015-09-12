var React = require('react')
  , GoogleMap = require('../map/google-map')
  , GoogleMapMarker = require('../map/google-map-marker')
  , GooglePlaceInput = require('./google-place-input')
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
	paddingTop:3,
	paddingBottom:5,
	fontSize:13
}

styles.bigAddressInput = {
	...styles.addressInput,
	height:54,
	fontSize:15
}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		var location = this.props.location
		
		this.state = {
			location: {
				coords:location.coords
			},
			zoom: 14
		}
	}
	changePlace(place) {
		this.setState({ location:locationUtil.getAddressComponents(place), zoom: 18 })
		this.focusName()
	}
	focusName() {
		var name = React.findDOMNode(this.refs.name)
		setTimeout(() => {
			if(!name) return this.focusName()
			if(!name.value && document.activeElement != name) {
				name.focus()
				this.focusName()
			}
		}, 10)
	}
	setCoords(coords) {
		this.state.location.coords = coords
		this.setState({ location:this.state.location })
		this.focusName()

		locationUtil.getAddressFromCoords(coords).then((address) => {
			address.coords = coords
			this.setState({ location:address })
		}).catch(window.alert)
	}
	render() {
		var location = this.state.location
		  , name = this.props.name
		  , address = location.full
		  , addressInputStyle = address ? styles.addressInput : styles.bigAddressInput

		return (
			<View style={styles.container}>
				{!!address && <Input ref="name" style={styles.nameInput} name={name+'[name]'} autocomplete="off" placeholder="Name this location..." />}
				<GooglePlaceInput style={addressInputStyle} value={address} onChange={this.changePlace.bind(this)} location={this.props.location} />
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