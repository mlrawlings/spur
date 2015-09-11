var React = require('react')

class Image extends React.Component {
	render() {
		return <img {...this.props} />
	}
}

module.exports = Image