var React = require('react')
  , Text = require('../core/text')

var styles = {}

styles.label = {
	fontWeight: 600,
	fontSize:12
}

class Label extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <Text style={{ ...styles.label, ...style }} {...this.props} />
	}
}

module.exports = Label