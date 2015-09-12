var React = require('react')

class View extends React.Component {
	render() {
		return <div {...this.props} />
	}
}

module.exports = View