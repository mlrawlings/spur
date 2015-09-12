var React = require('react')

var styles = {}

styles.text = {}

class Text extends React.Component {
	render() {
		var { style, ...props } = this.props

		return <span {...this.props} style={{ ...styles.text, ...style }} />
	}
}

module.exports = Text