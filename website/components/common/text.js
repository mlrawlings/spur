var React = require('react')

class Text extends React.Component {
	render() {
		return <span {...this.props} />
	}
}

module.exports = Text