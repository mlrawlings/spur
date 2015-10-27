var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('../event/event-list')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , View = require('../core/view')
  , LogoutButton = require('../button/logout-button')

var styles = {}

styles.header = {
	backgroundColor:'#444',
	alignItems:'center'
}

styles.photo = {
	width:150,
	height:150,
	borderRadius:'50%',
	borderWidth:3,
	borderStyle:'solid',
	borderColor:'#fff'
}

styles.name = {
	color:'#fff',
	fontWeight:300,
	fontSize:24,
	marginTop:20
}

styles.logout = {
	marginTop:5
}

styles.guestText = {
	color: '#fff',
	alignItems: 'center',
	justifyContent: 'center'
}

styles.buttons = {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center'
}

styles.logoutButton = {
	fontSize: 14,
	marginLeft: 20,
	marginRight: 20
}

class Profile extends React.Component {
	onLogin() {
		app.refresh()
	}
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var { user } = this.context
		  , { profileUser } = this.props
		  , events = profileUser.events
		  , isMe = user && profileUser.id == user.id
		
		return (
			<Layout>
				<Section style={styles.header}>
					<Avatar style={styles.photo} user={profileUser} />
					<Text style={styles.name}>{profileUser.name.full}</Text>
					{isMe && !user.isGuest && (
						<FacebookLoginButton style={styles.logout} user={user}>Log out of Facebook</FacebookLoginButton>
					)}
					{isMe && user.isGuest && (
						<View>
							<View style={styles.guestText}>
								<Text style={styles.guestText}>
									This is a guest account.
								</Text>
								<Text style={styles.guestText}>
									Connect to Facebook in order to save your account.
								</Text>
							</View>
							<View style={styles.buttons}>
								<FacebookLoginButton style={styles.logout} onLogin={this.onLogin}>Connect with Facebook</FacebookLoginButton>
								<LogoutButton style={styles.logoutButton}>Logout</LogoutButton>
							</View>
						</View>
					)}
				</Section>

				<EventList events={events} location={this.props.location} noEventsText={(isMe) ? 'You have not gone to any events yet.' : (user && profileUser.id != user.id ? 'You and ' + profileUser.name.first + ' have not gone to any events together yet.' : ('Login to see events that you and '+profileUser.name.first+' have gone to together.'))} />
			</Layout>
		)
	}
}

Profile.contextTypes = {
	user:React.PropTypes.object
}

module.exports = Profile
