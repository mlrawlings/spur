var React = require('react')
  , Text = require('./text')

var styles = {}

styles.label = {
	fontWeight: 600,
	textTransform:'uppercase',
	fontSize:10,
}

class Label extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <Text style={{ ...styles.label, ...style }} {...this.props} />
	}
}

module.exports = Label