var React = require('react')
  , PageHeader = require('./page-header')
  , PageFooter = require('./page-footer')
  , View = require('../core/view')

var styles = {}

styles.container = {
	flex:1
}

class Layout extends React.Component {
	render() {
		var { children, ...props} = this.props
		return (
			<View style={styles.container}>
				<PageHeader {...props} />
				<View style={styles.container}>{children}</View>
				<PageFooter />
			</View>
		)
	}
}

module.exports = Layout