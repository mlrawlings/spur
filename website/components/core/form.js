var React = require('react')
  , prefix = require('auto-prefixer')

class Form extends React.Component {
	render() {
		var { style, ...props } = this.props

		return <form method="POST" style={prefix(style)} {...props} />
	}
}

module.exports = Form