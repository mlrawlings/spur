var React = require('react')
  , Text = require('./text')

var styles = {}

styles.label = {
	fontWeight: 600,
	fontSize:14,
}

class Label extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <Text style={{ ...styles.label, ...style }} {...this.props} />
	}
}

module.exports = Label