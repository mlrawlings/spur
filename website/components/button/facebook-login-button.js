var React = require('react')
  , Button = require('../core/button')
  , Link = require('../core/link')
  , Image = require('../core/image')
  , Text = require('../core/text')
  , api = require('../../../api/client')

var styles = {}

styles.facebookButton = {
	backgroundColor:'#3a579d',
	flexDirection:'row'
}

styles.image = {
	width:20,
	height:20,
	marginRight:8
}

styles.text = {
	flex:1,
	paddingLeft:10,
	paddingRight:10
}

styles.avatar = {
	width:36,
	height:36,
	borderRadius:4,
	marginLeft:16
}

class FacebookLoginButton extends React.Component {
	render() {
		var text = this.props.children ? this.props.children : this.props.user ? 'Log out' : 'Log in' 
		  , href = '/facebook/' + (this.props.user ? 'logout' : 'login')

		if(this.props.avatar && this.props.user) return (
			<Link href={'/profile/'+this.props.user.id}>
				<Image style={styles.avatar} src={'https://graph.facebook.com/v2.3/'+this.props.user.fbid+'/picture'} />
			</Link>
		)

		return (
			<Button href={href} src="/images/facebook-icon-white.png" style={{ ...styles.facebookButton, ...this.props.style }}>
				{text}
			</Button>
		)
	}
}

module.exports = FacebookLoginButton