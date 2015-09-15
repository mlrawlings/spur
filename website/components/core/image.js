var React = require('react')
  , prefix = require('auto-prefixer')

class Image extends React.Component {
	render() {
		var { style, ...props } = this.props

		return <img style={prefix(style)} {...props} />
	}
}

module.exports = Image