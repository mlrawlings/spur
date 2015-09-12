var React = require('react')
  , Button = require('../core/button')
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
			
			api.post('/auth?access_token='+response.authResponse.accessToken).end(function(err, res){
				if(err) throw err

				window.user = res.body.user
				if(originalUserId != userId) app.refresh()
			})
		} else {
			this.setState({ userId: null })

			api.del('/auth').end(function(err, res){
				if(err) throw err

				window.user = undefined
				if(originalUserId) app.refresh()		
			})
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
		var src = this.state.userId ? 'https://graph.facebook.com/v2.3/'+this.state.userId+'/picture' : "/images/facebook-icon-white.png"
		  , text = this.props.children ? this.props.children : this.state.userId ? 'Log out' : 'Log in' 

		return (
			<Button src={src} style={{ ...styles.facebookButton, ...this.props.style }} onClick={this.click.bind(this)}>
				{text}
			</Button>
		)
	}
}

module.exports = FacebookLoginButton