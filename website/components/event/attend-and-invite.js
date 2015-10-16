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

styles.privateText = {
	fontSize: 12,
	color: '#666',
	fontWeight: '600'
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
		alertify.alert('<h1>See you there!</h1><p>Check back a bit before the event starts and make sure you haven\'t missed any updates.</p>')
	}
	render() {
		var { event, user, style } = this.props
		  , attending = user && event.attendees.some(attendee => attendee.id == user.id)
		  , isOwner = user && user.id == event.owner
		  , canEdit = isOwner && event.time >= new Date()

		if(event.cancelled) return isOwner ? <View style={{...styles.attend, ...style}}>
			<Heading>This event is cancelled</Heading>
			<View style={styles.buttons}>
				<Button style={styles.uncancel} src="/images/uncancel.png" href={'/event/'+event.id+'/uncancel'}>
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
				<Button ref="joinButton" src="/images/join.png" href={'/event/'+event.id+'/join'} onClick={this.onJoin.bind(this)}>
					Join
				</Button>
				<FacebookSendButton style={styles.invite} append="/invite" currentURL={this.props.currentURL}>Invite a Friend</FacebookSendButton>
				{isOwner && <Button style={styles.cancel} src="/images/cancel.png" href={'/event/'+event.id+'/cancel'}>
					Cancel
				</Button>}
				{canEdit && <Button style={styles.cancel} src="/images/cancel.png" href={'/event/'+event.id+'/edit'}>
					Edit
				</Button>}
			</View>
		</View>

		if(attending) return <View style={{...styles.attend, ...style}}>
			<Heading>You are going!</Heading>
		{isOwner && event.private && <Text style={styles.privateText}>This event is invite only, share it with your friends!</Text>}
					
			<View style={styles.buttons}>
				<Button style={styles.bail} src="/images/bail.png" href={'/event/'+event.id+'/bail'}>
					Bail
				</Button>
				<FacebookSendButton style={styles.invite} append="/invite" currentURL={this.props.currentURL}>Invite a Friend</FacebookSendButton>
				{isOwner && <Button style={styles.cancel} src="/images/cancel.png" href={'/event/'+event.id+'/cancel'}>
					Cancel
				</Button>}
				{canEdit && <Button style={styles.cancel} src="/images/cancel.png" href={'/event/'+event.id+'/edit'}>
					Edit
				</Button>}
			</View>
		</View>
	}
}

module.exports = AttendAndInvite