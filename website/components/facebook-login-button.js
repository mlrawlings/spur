var React = require('react')
  , api = require('../../api/client')

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
		if(response.status == 'connected') {
			this.setState({ userId: response.authResponse.userID })
			
			api.post('/auth?access_token='+response.authResponse.accessToken).end(function(err, res){
				if(err) throw err
			})
		} else {
			this.setState({ userId: null })

			api.del('/auth').end(function(err, res){
				if(err) throw err
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
			<button className="facebook icon" onClick={this.click.bind(this)}>
				<img src={this.state.userId ? 'https://graph.facebook.com/v2.3/'+this.state.userId+'/picture' : "/images/facebook-icon-white.png" } />
				<span>{this.state.userId ? 'Log Out' : 'Log In' }</span>
			</button>
		)
	}
}

module.exports = FacebookLoginButton