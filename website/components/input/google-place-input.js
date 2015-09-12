var React = require('react')
  , Input = require('../core/input')
  , locationUtil = require('../../util/location')

var styles = {}

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
	render() {
		var { value, onChange, ...props } = this.props

		return (
			<Input ref="input" defaultValue={value} placeholder="Enter an address or the name of an establishment..." {...props} />
		)
	}
}

module.exports = GooglePlaceInput