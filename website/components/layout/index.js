var React = require('react')
  , PageHeader = require('./page-header')
  , PageFooter = require('./page-footer')
  , OutdatedBrowser = require('./outdated-browser')
  , View = require('../core/view')

var styles = {}

styles.container = {
	flexGrow:1
}

class Layout extends React.Component {
	componentDidMount() {
		window.user = this.props.user
	}
	render() {
		var { children, ...props} = this.props
		return (
			<View style={styles.container}>
				<OutdatedBrowser />
				<PageHeader {...props} />
				<View style={styles.container}>{children}</View>
				<PageFooter />
			</View>
		)
	}
}

module.exports = Layout