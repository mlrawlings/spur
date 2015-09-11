var React = require('react')
  , FacebookLoginButton = require('./facebook-login-button')
  , Header = require('./header')
  , Footer = require('./footer')
  , View = require('../common/view')

var styles = {}

styles.container = {
	flex:1
}

class Layout extends React.Component {
	render() {
		var { children, ...props} = this.props
		return (
			<View style={styles.container}>
				<Header {...props} />
				<View style={styles.container}>{children}</View>
				<Footer />
			</View>
		)
	}
}

module.exports = Layout