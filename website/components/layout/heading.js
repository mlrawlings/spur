var React = require('react')
  , Text = require('../core/text')

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
		  , headingStyle = style ? { ...styles.heading, ...style } : styles.heading
		return <Text {...this.props} style={headingStyle} />
	}
}

module.exports = Heading