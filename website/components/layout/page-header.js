var React = require('react')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , Section = require('./section')
  , Link = require('../core/link')
  , Image = require('../core/image')
  , View = require('../core/view')

var styles = {}

styles.header = {
	width:'100%',
	paddingTop:30,
	paddingBottom:25,
	backgroundColor:'#fff',
	flexDirection:'row',
	borderBottomWidth:1,
	borderBottomColor:'#ddd'
}

styles.homeLink = {

}

styles.logo = {
	border:0,
	height:40
}

styles.nav = {
	flex:1,
	flexDirection:'row',
	justifyContent:'flex-end',
	alignItems:'center'
}

styles.navLink = {
	textTransform: 'uppercase',
	paddingTop:8,
	paddingBottom:8,
	paddingLeft:'4%',
	paddingRight:'4%',
	lineHeight:1.6,
	height:40,
	color:'#555',
	textDecoration: 'none'
}

styles.login = {
	marginLeft:'4%'
}

class Header extends React.Component {
	render() {
		var user = this.props.user

		return (
			<Section style={styles.header}>
				<Link href="/" style={styles.homeLink}>
					<Image style={styles.logo} src="/images/spur-logo.png" />
				</Link>
				<View style={styles.nav}>
					<Link href="/events" style={styles.navLink}>Nearby</Link>
					<FacebookLoginButton style={styles.login} user={user} avatar={true} />
				</View>
			</Section>
		)
	}
}

module.exports = Header