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

		this.state = {}
	}
	login() {
		this.setState({ loading:true })
		FB.login(response => {
			if(response.status != 'connected') {
				return this.setState({ loading:false })
			}

			api.post('/auth/facebook?access_token='+response.authResponse.accessToken).then(res => {
				window.user = res.user
				this.setState({ loading:false })
				this.props.onLogin && this.props.onLogin(res.user)
			}).catch(() => {
				this.setState({ loading:false })
			})
		}, {scope: 'public_profile,email'})
	}
	logout() {
		this.setState({ loading:true })
		FB.logout(response => {
			if(response.status == 'connected') {
				return this.setState({ loading:false })
			}

			api.del('/auth').then(res => {
				window.user = undefined
				this.setState({ loading:false })
				app.refresh()
			}).catch(() => {
				this.setState({ loading:false })
			})
		})
	}
	render() {
		var { user, children } = this.props
		  , action = user ? this.logout.bind(this) : this.login.bind(this)
		  , text = children || 'Facebook'
		
		return (
			<Button onClick={action} loading={this.state.loading} src="/images/facebook-icon-white.png" style={{ ...styles.facebookButton, ...this.props.style }}>
				{text}
			</Button>
		)
	}
}

module.exports = FacebookLoginButton