var React = require('react')
  , FacebookLoginButton = require('./facebook-login-button')
  , Section = require('../common/section')
  , Link = require('../common/link')
  , Image = require('../common/image')
  , View = require('../common/view')

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
	paddingLeft:16,
	paddingRight:16,
	height:40,
	color:'#555',
	textDecoration: 'none'
}

styles.login = {
	marginLeft:16
}

class Header extends React.Component {
	render() {
		return (
			<Section style={styles.header}>
				<Link href="/" style={styles.homeLink}>
					<Image style={styles.logo} src="/images/spur-logo.png" />
				</Link>
				<View style={styles.nav}>
					<Link href="/events" style={styles.navLink}>
						Browse
					</Link>
					<Link href="" style={styles.navLink}>
						Businesses
					</Link>
					<FacebookLoginButton style={styles.login} user={this.props.user} />
				</View>
			</Section>
		)
	}
}

module.exports = Header