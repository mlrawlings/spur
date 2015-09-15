var React = require('react')
  , Input = require('../core/input')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , locationUtil = require('../../util/location')

var styles = {}

styles.container = {
	flexDirection: 'row',
	alignItems: 'center',
	borderWidth:1,
	borderColor:'#ddd',
	backgroundColor:'#fff'
}

styles.currentLocation = {
	width: 15,
	cursor: 'pointer',
	top: 2,
	marginRight:8
}

styles.input = {
	backgroundColor:'transparent',
	borderWidth:0,
	flex:1
}

class GooglePlaceInput extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			bounds: locationUtil.getBounds(this.props.location.coords, 50)
		}
	}
	componentDidMount() {
		var input = React.findDOMNode(this.refs.input)
		
		this.autocomplete = new google.maps.places.Autocomplete(input, {
			bounds:locationUtil.toGoogleLatLngBounds(
				locationUtil.getBounds(this.props.location.coords, 50)
			)
		})

		this.autocomplete.addListener('place_changed', () => {
			var place = this.autocomplete.getPlace()
			this.props.onChange && this.props.onChange(place)
		})
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value) {
			React.findDOMNode(this.refs.input).value = nextProps.value
		}
		if(nextProps.location != this.props.location) {
			this.autocomplete.setBounds(
				locationUtil.toGoogleLatLngBounds(
					locationUtil.getBounds(nextProps.location.coords, 50)
				)
			)
		}
	}
	currentAddressMouseOver() {
		var domNode = React.findDOMNode(this.refs.input)

		this.setState({ value:domNode.value })
		domNode.value = 'Use Current Location'
	}
	currentAddressMouseOut() {
		React.findDOMNode(this.refs.input).value = this.state.value
	}
	currentAddressClick() {
		locationUtil.getLocation().then((location) => {
			this.setState({ value: location.formatted_address })
			React.findDOMNode(this.refs.input).value = location.formatted_address
			this.props.onChange && this.props.onChange(location)
		})
	}
	render() {
		var { value, style, onChange, ...props } = this.props
		  , { padding, paddingLeft, paddingRight, paddingBottom, paddingTop, height, ...containerStyle} = style
		  , inputStyle = {padding, paddingLeft, paddingRight, paddingBottom, paddingTop, height}

		inputStyle.paddingLeft = 0
		containerStyle.paddingLeft = paddingLeft || padding

		Object.keys(inputStyle).forEach(function(style) {
			if(inputStyle[style] === undefined) delete inputStyle[style]
		})

		return (
			<View style={{ ...styles.container, ...containerStyle}}>
				<Link onMouseOver={this.currentAddressMouseOver.bind(this)} onMouseOut={this.currentAddressMouseOut.bind(this)} onClick={this.currentAddressClick.bind(this)}>
					<Image style={styles.currentLocation} src="/images/current-location.png" />
				</Link>
				<Input ref="input" style={{...styles.input, ...inputStyle}} defaultValue={value} placeholder="Enter an address or the name of an establishment..." {...props} />
			</View>
		)
	}
}

module.exports = GooglePlaceInput