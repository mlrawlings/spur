var React = require('react')
  , Heading = require('../layout/heading')
  , Section = require('../layout/section')
  , MediaQuery = require('react-responsive')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Form = require('../core/form')
  , Link = require('../core/link')
  , Avatar = require('../core/avatar')
  , Input = require('../core/input')
  , FlatButton = require('../core/flat-button')
  , timeUtil = require('../../util/time')

var styles = {}

styles.container = {
	flex:1,
	backgroundColor:'#eaeaea',
	maxHeight:350
}

styles.containerExpanded = {
	position:'fixed',
	top:0, left:0, right:0, bottom:0,
	width:'100%',
	height:'100%',
	backgroundColor:'#eaeaea',
	zIndex:10
}

styles.headerExpanded = {
	backgroundColor:'#fff',
	paddingTop:10,
	paddingBottom:10,
	alignItems:'center',
	justifyContent:'space-between',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	flexDirection:'row'
}

styles.header = {
	background:'#eaeaea',
	position:'absolute',
	top:0, left:0,
	width:'100%',
	flexDirection:'row',
	justifyContent:'flex-end',
	paddingTop:20,
	paddingBottom:0,
	zIndex:1,
}

styles.fader = {
	backgroundImage:'linear-gradient(to bottom, #eaeaea 0%, rgba(234, 234, 234, 0) 100%)',
	height:55,
	position:'absolute',
	top:'100%',
	left:0,
	width:'100%'
}

styles.title = {
	fontSize:20,
	fontWeight:300
}

styles.headerBack = {
	fontSize:23,
	marginTop:-6
}

styles.headerClose = {
	fontSize:20
}

styles.messages = {
	paddingTop:10,
	paddingBottom:0,
	flexGrow:1,
	height:250,
	overflow:'hidden'
}

styles.messagesExpanded = {
	...styles.messages,
	flexBasis:'auto',
	flexShrink:1,
	overflow:'auto'
}

styles.messageStarter = {
	alignItems:'center',
	justifyContent:'center',
	flexGrow:1,
	paddingBottom:10,
	textAlign:'center'
}

styles.messageStarterText = {
	fontSize:20,
	color:'#aaa',
}

class EventChat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		this.scrollToBottom = () => {
			var messages = React.findDOMNode(this.refs.messages)
			messages.scrollTop = messages.scrollHeight
		}

		this.scrollToBottom()

		window.addEventListener('resize', this.scrollToBottom)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.scrollToBottom)
	}
	componentWillUpdate() {
		var messages = React.findDOMNode(this.refs.messages)
		this.shouldScrollBottom = messages.scrollTop + messages.offsetHeight === messages.scrollHeight
	}
	componentDidUpdate() {
		if(this.shouldScrollBottom) {
			var messages = React.findDOMNode(this.refs.messages)
			messages.scrollTop = messages.scrollHeight
		}
		if(this.resetBodyScroll) {
			this.resetBodyScroll = false
			document.body.scrollTop = document.body.scrollHeight
		}
	}
	expand(e) {
		this.shouldScrollBottom = true
		this.setState({ expanded:true })
		document.body.scrollTop = document.body.scrollHeight
		this.toggleBodyScroll(false)
	}
	collapse() {
		this.shouldScrollBottom = true
		this.resetBodyScroll = true
		this.setState({ expanded:false })
		this.toggleBodyScroll(true)
	}
	toggleBodyScroll(allowScroll) {
		if(allowScroll) {
			document.body.style.overflow = 'auto'
		} else {
			document.body.style.overflow = 'hidden'
		}
	}
	render() {
		var { event, user } = this.props
		  , { expanded } = this.state

		return (
			<View style={expanded ? styles.containerExpanded : styles.container}>
				{expanded ? (
					<Section onClick={this.collapse.bind(this)} style={styles.headerExpanded}>
						<Text style={styles.headerBack}>&lsaquo;</Text>
						<Text style={styles.title}>{event.name}</Text>
						<Text style={styles.headerClose}>&times;</Text>
					</Section>
				) : (
					<Section style={styles.header}>
						<Text onClick={this.expand.bind(this)}>View All</Text>
						<View style={styles.fader} />
					</Section>
				)}
				<Section ref="messages" style={expanded ? styles.messagesExpanded : styles.messages}>
					<View style={styles.messageStarter}>
						<Text style={styles.messageStarterText}>Got questions or comments?</Text>
						<Text style={styles.messageStarterText}>Add them below.</Text>
					</View>
					{event.posts.map((message, i) => 
						<Message event={event} user={user} message={message} key={message.id} />
					)}
				</Section>
				<MessageForm event={event} user={user} />
			</View>
		)
	}
}

styles.message = {
	flexDirection:'row',
	marginBottom:10
}

styles.messageAvatar = 
styles.myMessageAvatar = {
	marginRight:10,
}

styles.messageAvatarImage = {
	height:45,
	width:45,
	borderRadius:4
}

styles.messageContent = 
styles.myMessageContent = {
	flexGrow:1,
	alignItems:'flex-start',
}

styles.messageName = {
	fontSize:10,
	color:'#888'
}

styles.messageText = {

}

class Message extends React.Component {
	render() {
		var { message, user } = this.props
		  , isOwner = user && message.user.id == user.id

		return (
			<View style={styles.message}>
				<Link style={isOwner ? styles.myMessageAvatar : styles.messageAvatar} href={'/profile/'+message.user.id}>
					<Avatar style={styles.messageAvatarImage} user={message.user} />
				</Link>
				<View style={isOwner ? styles.myMessageContent : styles.messageContent}>
					<Text>
						<Text style={styles.messageName}>{message.user.name.first}</Text> 
					</Text>
					<Text style={styles.messageText}>{message.message}</Text>
				</View>
			</View>
		)
	}
}

styles.form = {
	flexDirection:'row',
	backgroundColor:'#fff',
	borderTopWidth:1,
	borderTopColor:'#ddd',
	alignItems:'center',
	paddingLeft:5,
	paddingRight:5,
	zIndex:2
}
styles.messageInput = {
	flex:1,
	padding:'3%',
	paddingTop:10,
	paddingBottom:10,
	borderWidth:0,
	fontSize:15,
	backgroundColor:'transparent',
	resize:'none'
}
styles.messageButton = {
	backgroundColor:'transparent',
	padding: '3%'
}
styles.messageButtonText = {
	color:'#04beca'
}
styles.messageButtonTextDisabled = {
	color:'#999'
}

const ENTER = 13

class MessageForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasValue:false
		}
	}
	handleEnter(e) {
		if(e.which == ENTER) {
			this.submitMessage(e)
		}

		var message = React.findDOMNode(this.refs.message)
		setTimeout(() => this.setState({ hasValue:!!message.value.trim() }))
	}
	refocus() {
		React.findDOMNode(this.refs.message).focus()
	}
	submitMessage(e) {
		var message = React.findDOMNode(this.refs.message)
		  , form = React.findDOMNode(this.refs.form)
		
		if(React.findDOMNode(this.refs.message).value.trim()) {
			this.setState({ loading:true })
			app.submit(form).then(() => {
				form.reset()
				this.setState({ hasValue:false, loading:false })
			})
		}

		e.preventDefault()
	}
	render() {
		var { event, user, onFocus } = this.props
		  , { hasValue, loading } = this.state

		return (
			<Form style={styles.form} onSubmit={this.submitMessage.bind(this)} ref="form" action={'/event/'+event.id+'/post'}>
				<Input onFocus={onFocus} type="textarea" ref="message" style={styles.messageInput} onKeyDown={this.handleEnter.bind(this)} name="message" placeholder="Say something..." />
				<FlatButton onClick={this.refocus.bind(this)} loading={loading} style={styles.messageButton} type="submit">
					<Text style={hasValue ? styles.messageButtonText : styles.messageButtonTextDisabled}>Send</Text>
				</FlatButton>
			</Form>
		)
	}
}

module.exports = EventChat