var React = require('react')
  , AutoSuggest = require('react-autosuggest')
  , Input = require('../common/input')
  , locationUtil = require('../../util/location')

var styles = {}

class AddressInput extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			bounds: locationUtil.getBounds(this.props.location.coords, 50)
		}
	}
	getSuggestions(value, fn) {
		locationUtil.getAddressFromSearch(value, this.state.bounds, true).then((results) => {
			fn(null, results)
		})
	}
	getSuggestionValue(result) {
		return result.formatted_address
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.props.value) {
			this.refs.autosuggest.setState({ value:nextProps.value })
		}
		if(nextProps.location != this.props.location) {
			this.setState({ bounds: locationUtil.getBounds(nextProps.location.coords, 50) })
		}
	}
	render() {
		var location = this.state.location
		  , { style, value, onChange, ...props } = this.props
		  , inputProps = { value, style:{ ...Input.style, ...style }, ...props }

		return (
			<AutoSuggest
				ref="autosuggest"
				inputAttributes={inputProps} 
				suggestions={this.getSuggestions.bind(this)} 
				suggestionValue={this.getSuggestionValue.bind(this)}
				suggestionRenderer={this.getSuggestionValue.bind(this)}
				onSuggestionSelected={onChange} />
		)
	}
}

module.exports = AddressInput