var React = require('react')
  , FacebookLoginButton = require('./facebook-login-button')
  , Section = require('../common/section')
  , Text = require('../common/text')

var styles = {}

styles.footer = {
	backgroundColor: '#e0e0e0',
	paddingTop:15,
	paddingBottom:15,
	alignItems: 'center',
	borderTopWidth:1,
	borderTopColor:'#ddd'
}

styles.copyright = {
	fontSize:12,
	color:'#999'
}

class Footer extends React.Component {
	render() {
		return (
			<Section style={styles.footer}>
				<Text style={styles.copyright}>
					Made with &hearts; by Embark in Roanoke, VA
				</Text>
			</Section>
		)
	}
}

module.exports = Footer