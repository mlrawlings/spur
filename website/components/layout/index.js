var React = require('react')
  , PageHeader = require('./page-header')
  , PageFooter = require('./page-footer')
  , View = require('../core/view')

var styles = {}

styles.container = {
	flexGrow:1
}

class Layout extends React.Component {
	componentDidMount() {
		window.user = this.context.user
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

Layout.contextTypes = {
	user:React.PropTypes.object
}

module.exports = Layout