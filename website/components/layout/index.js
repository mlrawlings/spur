var React = require('react')
  , PageHeader = require('./page-header')
  , PageFooter = require('./page-footer')
  , View = require('../core/view')

var styles = {}

styles.container = {
	flexGrow:1
}

class Layout extends React.Component {
	getChildContext() {
		var { user, device, url } = this.props
		return { user, device, url }
	}
	componentDidMount() {
		window.user = this.props.user
	}
	render() {
		var { children, noFooter } = this.props
		return (
			<View style={styles.container}>
				<PageHeader />
				<View style={styles.container}>{children}</View>
				{!noFooter && <PageFooter />}
			</View>
		)
	}
}

Layout.childContextTypes = {
	user:React.PropTypes.object,
	device:React.PropTypes.object,
	url:React.PropTypes.string
}

module.exports = Layout