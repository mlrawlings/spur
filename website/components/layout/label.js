var React = require('react')
  , Text = require('../core/text')

var styles = {}

styles.label = {
	fontWeight: 600,
	fontSize:12
}

styles.optional = {
	fontSize:11,
	color:'#aaa',
	marginLeft:4
}

class Label extends React.Component {
	render() {
		var { style, children, required, ...props } = this.props
		return <Text style={{ ...styles.label, ...style }} {...this.props}>
			{children} {!required && <Text style={styles.optional}>(optional)</Text>}
		</Text>
	}
}

module.exports = Label