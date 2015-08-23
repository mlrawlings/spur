var React = require('react')
  , Text = require('./text')

var styles = {}

styles.heading = {
	fontWeight: 600,
	textTransform:'uppercase',
	color:'#aaa',
	fontSize:12,
}

class Heading extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <Text style={{ ...styles.heading, ...style }} {...this.props} />
	}
}

module.exports = Heading