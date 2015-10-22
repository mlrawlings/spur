var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('../event/event-list')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , Link = require('../core/link')
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

class Profile extends React.Component {
	onLogin() {
		app.refresh()
	}
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var { user, profileUser } = this.props
		  , events = profileUser.events
		
		return (
			<Layout user={user}>
				<Section style={styles.header}>
					<Avatar style={styles.photo} user={profileUser} />
					<Text style={styles.name}>{profileUser.name.full}</Text>
					{user && !user.isGuest && profileUser.id == user.id && <FacebookLoginButton style={styles.logout} user={user}>Log out of Facebook</FacebookLoginButton>}
					
					{user && user.isGuest && profileUser.id == user.id && <FacebookLoginButton style={styles.logout} onLogin={this.onLogin}>Connect with Facebook</FacebookLoginButton>}
					{user && user.isGuest && profileUser.id == user.id && <LogoutButton>Logout</LogoutButton>}
				</Section>

				<EventList events={events} location={this.props.location} noEventsText={(user && profileUser.id == user.id) ? 'You have not gone to any events yet.' : (user && profileUser.id != user.id ? 'You and ' + profileUser.name.first + ' have not gone to any events together yet.' : ('Login to see events that you and '+profileUser.name.first+' have gone to together.'))} />
			</Layout>
		)
	}
}

module.exports = Profile
