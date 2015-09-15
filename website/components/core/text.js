var React = require('react')
  , prefix = require('auto-prefixer')

var styles = {}

styles.text = {}

class Text extends React.Component {
	render() {
		var { style, ...props } = this.props

		return <span {...props} style={prefix({ ...styles.text, ...style })} />
	}
}

module.exports = Text