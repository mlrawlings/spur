var React = require('react')
  , Heading = require('../layout/heading')
  , Button = require('../core/button')
  , View = require('../core/view')
  , Text = require('../core/text')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , FacebookSendButton = require('../button/facebook-send-button')

var styles = {}

styles.attend = {
	justifyContent:'center',
	alignItems:'flex-start'
}

styles.header = {
	textTransform:'none',
	color:'#444',
	marginBottom:5,
}

styles.buttons = {
	flexDirection:'row',
	marginTop:5
}

styles.invite = {
	marginLeft:5
}

styles.bail = {
	backgroundColor: '#666'
}

class AttendAndInvite extends React.Component {
	render() {
		var { event, user, style } = this.props
		  , attending = user && event.attendees.some(attendee => attendee.id == user.id)

		if(!user) return <View style={{...styles.attend, ...style}}>
			<Heading>Want to go?</Heading>
			<View style={styles.buttons}>
				<FacebookLoginButton>Login to Join or Post</FacebookLoginButton>
			</View>
		</View>
		
		if(!attending) return <View style={{...styles.attend, ...style}}>
			<Heading>Want to go?</Heading>
			<View style={styles.buttons}>
				<Button href={'/event/'+event.id+'/join'}>
					Join
				</Button>
				<FacebookSendButton style={styles.invite}>Invite a Friend</FacebookSendButton>
			</View>
		</View>

		if(attending) return <View style={{...styles.attend, ...style}}>
			<Heading>You are going!</Heading>
			<View style={styles.buttons}>
				<Button style={styles.bail} href={'/event/'+event.id+'/bail'}>
					Bail
				</Button>
				<FacebookSendButton style={styles.invite}>Invite a Friend</FacebookSendButton>
			</View>
		</View>
	}
}

module.exports = AttendAndInvite