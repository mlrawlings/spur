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
		window.user = this.props.user
	}
	render() {
		var { children, noFooter, ...props} = this.props
		return (
			<View style={styles.container}>
				<PageHeader {...props} />
				<View style={styles.container}>{children}</View>
				{!noFooter && <PageFooter />}
			</View>
		)
	}
}

module.exports = Layout