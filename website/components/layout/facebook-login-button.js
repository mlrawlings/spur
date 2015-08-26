var React = require('react')
  , Button = require('../common/button')
  , Image = require('../common/image')
  , Text = require('../common/text')
  , api = require('../../../api/client')

var styles = {}

styles.facebookButton = {
	width:110,
	backgroundColor:'#3a579d',
	flexDirection:'row'
}

styles.image = {
	width:20,
	height:20,
	marginRight:8
}

styles.text = {
	flex:1
}

class FacebookLoginButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: this.props.userId
		}
	}
	componentDidMount() {
		if(window.FB) return this.initFacebook()

		window.fbAsyncInit = this.initFacebook.bind(this)
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
				if(originalUserId != userId) window.location.reload()
			})
		} else {
			this.setState({ userId: null })

			api.del('/auth').end(function(err, res){
				if(err) throw err
				if(originalUserId) window.location.reload()
			})
		}
	}
	click(e) {
		if(this.state.userId) {
			FB.logout(this.onChangeLoginStatus.bind(this))
		} else {
			FB.login(this.onChangeLoginStatus.bind(this))
		}
	}
	render() {
		return (
			<Button style={{ ...styles.facebookButton, ...this.props.style }} onClick={this.click.bind(this)}>
				<Image style={styles.image} src={this.state.userId ? 'https://graph.facebook.com/v2.3/'+this.state.userId+'/picture' : "/images/facebook-icon-white.png" } />
				<Text style={styles.text}>{this.state.userId ? 'Log out' : 'Log in' }</Text>
			</Button>
		)
	}
}

module.exports = FacebookLoginButton