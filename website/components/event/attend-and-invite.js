var React = require('react')
  , Heading = require('../layout/heading')
  , Button = require('../core/button')
  , FlatButton = require('../core/flat-button')
  , View = require('../core/view')
  , Text = require('../core/text')
  , FacebookLoginButton = require('../button/facebook-login-button')
  , ShareButton = require('../button/share-button')
  , UserActionButton = require('../button/user-action-button')

var styles = {}

styles.heading = {
	marginBottom:5
}

styles.buttonsInline = {
	justifyContent:'flex-start',
	flexDirection:'row',
	marginBottom: 30
}

styles.buttonsFixed = {
	position:'fixed',
	left:0, right:0, bottom:0,
	zIndex:5,
	backgroundColor:'#fff',
	flexDirection:'row',
	transition:'all 0.4s',
}

styles.buttonsFixedHidden = {
	...styles.buttonsFixed,
	transform:'translateY(100px)'
}

styles.cancelBanner = {
	...FlatButton.style,
	backgroundColor:'#444',
	flexGrow:1
}

styles.joinButton = {
	flexGrow:1
}

styles.bailButton = {
	backgroundColor:'#444',
	flexGrow:0.001
}

styles.inviteButton = {
	backgroundColor:'rgb(0,132,255)',
	flexGrow:0.001
}

styles.inviteButtonLarge = {
	...styles.inviteButton,
	flexGrow:1
}

styles.buttonText = {
	fontSize:15,
	fontWeight:600,
	color:'#fff'
}

styles.buttonTextSmall = {
	...styles.buttonText,
	fontSize:10
}

class AttendAndInvite extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hide:false }
	}
	componentDidMount() {
		var previousY = window.scrollY
		  , running = false
		this.scrollListener = () => {
			if(running) return
			running = true
			requestAnimationFrame(() => {
				var distanceFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight
				
				if(window.scrollY < previousY) {
					if(distanceFromBottom > 0) this.setState({ hide:false })
				} else {
					if(distanceFromBottom < 200) this.setState({ hide:true })
				}

				previousY = window.scrollY
				running = false
			})
		}
		window.addEventListener('scroll', this.scrollListener)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollListener)
	}
	renderButtons(ButtonElement, isInline) {
		var { user } = this.context
		  , { event } = this.props
		  , attending = user && event.attendees.some(attendee => attendee.id == user.id)
		  , spotsRemaining = (event.max && event.max - event.attendees.length)
		  , spotsReaminingText = spotsRemaining + (spotsRemaining == 1 ? ' spot' : ' spots') + ' remaining...'

		var transformStyles = (styles) => {
			if(isInline) {
				var transformedStyles = { ...styles, marginRight:10, }
				delete transformedStyles.flexGrow
				return transformedStyles
			}
			return styles
		}

		if(!event.cancelled) return [
			attending ? (
				<ButtonElement style={transformStyles(styles.bailButton)} href={'/event/'+event.id+'/bail'}>
					<Text style={styles.buttonText}>Bail</Text>
				</ButtonElement>
			) : (
				<UserActionButton tag={ButtonElement} style={transformStyles(styles.joinButton)} action={'/event/'+event.id+'/join'} actionName="Go!">
					<Text style={styles.buttonText}>Count me in!</Text>
					{!isInline && spotsRemaining > 0 && <Text style={styles.buttonTextSmall}>{spotsReaminingText}</Text>}
				</UserActionButton>
			),
			<ShareButton tag={ButtonElement} style={transformStyles(attending ? styles.inviteButtonLarge : styles.inviteButton)}>
				<Text style={styles.buttonText}>{attending || isInline ? 'Invite Friends' : 'Invite'}</Text>
				{!isInline && attending && spotsRemaining > 0 && <Text style={styles.buttonTextSmall}>{spotsReaminingText}</Text>}
			</ShareButton>
		]

		return (
			<View style={styles.cancelBanner}>
				<Text style={styles.buttonText}>This event was cancelled</Text>
			</View>
		)
	}
	render() {
		var { user } = this.context
		  , { event } = this.props
		  , attending = user && event.attendees.some(attendee => attendee.id == user.id)
		  , isSmall = '(max-width:500px) and (max-height:750px), (max-height:500px) and (max-width:750px)'
		  , isLarge = '(min-width:501px) and (min-height:501px), (min-width:751px), (min-height:751px)'

		return (
			<View>
				<View query={isSmall} style={this.state.hide ? styles.buttonsFixedHidden : styles.buttonsFixed}>
					{this.renderButtons(FlatButton, false)}
				</View>
				{!event.cancelled && <View query={isLarge} >
					<Heading style={styles.heading}>{attending ? 'You\'re going!' : 'Want to go?'}</Heading>
					<View style={styles.buttonsInline}>{this.renderButtons(Button, true)}</View>
				</View>}
			</View>
		)
	}
}

AttendAndInvite.contextTypes = {
	user:React.PropTypes.object
}

module.exports = AttendAndInvite