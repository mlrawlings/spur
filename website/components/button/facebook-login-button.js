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
	constructor(props) {
		super(props)
		this.state = {
			userId: this.props.user && this.props.user.fbid
		}
	}
	componentDidMount() {
		if(window.FB) return this.initFacebook()

		window.fbAsyncInit = this.initFacebook.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			userId: nextProps.user && nextProps.user.fbid
		})
	}
	initFacebook() {
		FB.init({
			appId: '1455687261396384',
			xfbml: false,
			status: true,
			version: 'v2.3'
		})

		FB.getLoginStatus(this.onChangeLoginStatus.bind(this))
	}
	onChangeLoginStatus(response) {
		var originalUserId = this.state.userId
		if(response.status == 'connected') {
			var userId = response.authResponse.userID
			
			this.setState({ userId })
			
			api.post('/auth?access_token='+response.authResponse.accessToken).then(res => {
				window.user = res.user
				if(originalUserId != userId) app.refresh()
			}).catch(e => console.error(e.stack))
		} else {
			this.setState({ userId: null })

			api.del('/auth').then(res => {
				window.user = undefined
				if(originalUserId) app.refresh()	
			}).catch(e => console.error(e.stack))
		}
	}
	click(e) {
		if(this.state.userId) {
			FB.logout(this.onChangeLoginStatus.bind(this))
		} else {
			FB.login(this.onChangeLoginStatus.bind(this), { scope:'public_profile,email,user_birthday' })
		}
	}
	render() {
		var text = this.props.children ? this.props.children : this.state.userId ? 'Log out' : 'Log in' 

		if(this.props.avatar && this.props.user) return (
			<Link href={'/profile/'+this.props.user.id}>
				<Image style={styles.avatar} src={'https://graph.facebook.com/v2.3/'+this.state.userId+'/picture'} />
			</Link>
		)

		return (
			<Button src="/images/facebook-icon-white.png" style={{ ...styles.facebookButton, ...this.props.style }} onClick={this.click.bind(this)}>
				{text}
			</Button>
		)
	}
}

module.exports = FacebookLoginButton