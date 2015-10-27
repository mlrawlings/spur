var React = require('react')
  , GoogleMap = require('../map/google-map')
  , GoogleMapMarker = require('../map/google-map-marker')
  , PlaceInput = require('./place-input')
  , Input = require('../core/input')
  , View = require('../core/view')
  , Text = require('../core/text')
  , locationUtil = require('../../util/location')

var styles = {}

styles.container = {
	borderWidth:1,
	borderColor:'#ccc'
}

styles.containerWithError = {
	borderWidth:1,
	borderColor:'#c00'
}

styles.errorText = {
	fontSize:12,
	fontWeight:600,
	color:'#c00'
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

styles.dragInstructions = {
	height:50,
	backgroundColor:'rgba(68,68,68,0.9)',
	justifyContent:'center',
	alignItems:'center',
	position:'absolute',
	bottom:0,
	left:0,
	width:'100%'
}

styles.dragInstructionsText = {
	color:'#fff'
}

styles.dragArrow = {
	borderColor:'transparent',
	borderBottomColor:'rgba(68,68,68,0.9)',
	height:0,
	width:0,
	position:'absolute',
	bottom:'100%',
	left:'50%',
	marginLeft:-20,
	borderWidth:20,
}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			place: props.defaultValue,
			zoom: props.zoom || 18,
			drug: false 
		}
	}
	onError(error) {
		this.setState({ place:null, error })
		this.props.onChange && this.props.onChange(null)
	}
	changePlace(place) {
		this.setState({ place, zoom: 18, error:null })
		this.props.onChange && this.props.onChange(place)
		if(!place.street) {
			locationUtil.getAddressFromCoords(place.coords).then(address => {
				return locationUtil.getAddressComponents(address)
			}).then(p => {
				place.street = p.street
				place.citystatezip = p.citystatezip
				place.full = p.full
				this.setState({ place })
				this.refs.placeInput.setState({ value:place.full })
			}).catch(window.alert)
		}
	}
	hideDragMessage() {
		this.setState({ drug:true })
	}
	setCoords(coords) {
		this.state.place.coords = coords
		this.setState({ place:this.state.place })
	}
	render() {
		var { place, drug, error } = this.state
		  , { name, required, noDetect, location } = this.props
		  , address = place && place.full

		return (
			<View>
				<View style={error ? styles.containerWithError : styles.container}>
					<PlaceInput ref="placeInput" defaultValue={place} noDetect={noDetect} style={styles.addressInput} required={required} value={address} onError={this.onError.bind(this)} onChange={this.changePlace.bind(this)} location={location} />
					{place && <View>
						<GoogleMap center={place.coords} zoom={this.state.zoom}>
							<GoogleMapMarker draggable={true} position={place.coords} onDragStart={this.hideDragMessage.bind(this)} onDragEnd={this.setCoords.bind(this)} />
						</GoogleMap>
						{!drug && <View style={styles.dragInstructions}>
							<View style={styles.dragArrow} />
							<Text style={styles.dragInstructionsText}>Drag the pin to the exact location</Text>
						</View>}
					</View>}
					{place &&<input type="hidden" name={name+'[street]'} value={place.street} />}
					{place &&<input type="hidden" name={name+'[full]'} value={place.full} />}
					{place &&<input type="hidden" name={name+'[citystatezip]'} value={place.citystatezip} />}
					{place &&<input type="hidden" name={name+'[coords][0]'} value={place.coords[0]} />}
					{place &&<input type="hidden" name={name+'[coords][1]'} value={place.coords[1]} />}
				</View>
				{error &&<Text style={styles.errorText}>{error.message}</Text>}
			</View>
		)
	}
}

module.exports = LocationInput