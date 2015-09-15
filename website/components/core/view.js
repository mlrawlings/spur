var React = require('react')
  , prefix = require('auto-prefixer')

class View extends React.Component {
	render() {
		var { style, ...props } = this.props

		return <div style={prefix(style)} {...props} />
	}
}

module.exports = View