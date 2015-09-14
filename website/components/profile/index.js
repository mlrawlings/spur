var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('../event/event-list')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , Image = require('../core/image')
  , Text = require('../core/text')
  , Link = require('../core/link')

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
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var user = this.props.profileUser
		  , events = user.events
		
		return (
			<Layout user={this.props.user}>
				<Section style={styles.header}>
					<Image style={styles.photo} src={'https://graph.facebook.com/v2.3/'+user.fbid+'/picture?width=150&height=150'} />
					<Text style={styles.name}>{user.name.full}</Text>
					<FacebookLoginButton style={styles.logout} user={user}>Log out of Facebook</FacebookLoginButton>
				</Section>

				<EventList events={events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = Profile
