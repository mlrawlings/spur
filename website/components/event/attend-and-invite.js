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
	alignItems:'flex-start',
	marginBottom: 30
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

styles.uncancel = {

}

styles.cancel = {
	backgroundColor: '#c00',
	marginLeft:5
}

class AttendAndInvite extends React.Component {
	onJoin(e) {
		alert('Remember to check back to see if any details have changed!')
	}
	render() {
		var { event, user, style } = this.props
		  , attending = user && event.attendees.some(attendee => attendee.id == user.id)
		  , isOwner = user && user.id == event.owner

		if(event.cancelled) return isOwner ? <View style={{...styles.attend, ...style}}>
			<Heading>This event is cancelled</Heading>
			<View style={styles.buttons}>
				<Button style={styles.uncancel} href={'/event/'+event.id+'/uncancel'}>
					UnCancel
				</Button>
			</View>
		</View> : false

		if(!user) return <View style={{...styles.attend, ...style}}>
			<Heading>Want to go?</Heading>
			<View style={styles.buttons}>
				<FacebookLoginButton>Login to Join or Post</FacebookLoginButton>
			</View>
		</View>

		
		
		if(!attending) return <View style={{...styles.attend, ...style}}>
			<Heading>Want to go?</Heading>
			<View style={styles.buttons}>
				<Button ref="joinButton" href={'/event/'+event.id+'/join'} onClick={this.onJoin.bind(this)}>
					Join
				</Button>
				<FacebookSendButton style={styles.invite} append="/invite" currentURL={this.props.currentURL}>Invite a Friend</FacebookSendButton>
				{isOwner && <Button style={styles.cancel} href={'/event/'+event.id+'/cancel'}>
					Cancel
				</Button>}
			</View>
		</View>

		if(attending) return <View style={{...styles.attend, ...style}}>
			<Heading>You are going!</Heading>
			<View style={styles.buttons}>
				<Button style={styles.bail} href={'/event/'+event.id+'/bail'}>
					Bail
				</Button>
				<FacebookSendButton style={styles.invite} append="/invite" currentURL={this.props.currentURL}>Invite a Friend</FacebookSendButton>
				{isOwner && <Button style={styles.cancel} href={'/event/'+event.id+'/cancel'}>
					Cancel
				</Button>}
			</View>
		</View>
	}
}

module.exports = AttendAndInvite