var React = require('react')
  , Image = require('../../core/image')
  , View = require('../../core/view')
  , Link = require('../../core/link')
  , Button = require('../../core/button')
  , TextArea = require('react-textarea-autosize')
  , scroll = __BROWSER__ && require('scroll')

const ENTER = 13

var styles = {}

styles.form = {
	flexDirection:'row',
	backgroundColor:'#f4f4f4',
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#e6e6e6'
}

styles.commentButton = {
	backgroundColor:'transparent',
	color:'#04beca',
	borderWidth:0,
	borderBottomWidth:0,
	padding: 5
}
styles.commentButtonDisabled = {
	...styles.commentButton,
	color:'#ccc'
}

styles.image = {
	width:35,
	height:35,
	marginRight:10,
	borderRadius:4
}

styles.messageContainer = {
	borderWidth:1,
	borderColor:'#ddd',
	backgroundColor:'#fff',
	flexDirection:'row',
	flex:1,
}

styles.message = {
	flex:1,
	minHeight:35,
	padding:8,
	borderWidth:0,
	fontSize:13,
	backgroundColor:'transparent',
	resize:'none'
}

class Comment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasValue:false
		}
	}
	handleEnter(e) {
		if(e.which == ENTER) {
			this.submitComment(e)
		}
		this.setState({ hasValue:!!e.target.value })
	}
	submitComment(e) {
		var message = React.findDOMNode(this.refs.message)
		  , form = React.findDOMNode(this.refs.form)
		
		if(React.findDOMNode(this.refs.message).value) app.submit(form).then(() => {
			var distance = form.getBoundingClientRect().bottom
			  , difference = distance-window.innerHeight
			
			if(difference > 0)
				scroll.top(document.body, window.scrollY+difference, { duration:difference })
			
			form.reset()
			this.setState({ hasValue:false })
		})

		e.preventDefault()
	}
	render() {
		var { event, post, user } = this.props
		  , { hasValue } = this.state

		if(!user) return false

		return (
			<form style={styles.form} onSubmit={this.submitComment.bind(this)} ref="form" action={'/event/'+event.id+'/posts/'+post.id+'/comment'} method="POST">
				<Link href={'/profile/'+user.id}>
					<Image style={styles.image} src={'https://graph.facebook.com/'+user.fbid+'/picture'} />
				</Link>
				<View style={styles.messageContainer}>
					<TextArea ref="message" style={styles.message} onKeyDown={this.handleEnter.bind(this)} name="message" placeholder="Write a comment..." />
					<Button style={hasValue ? styles.commentButton : styles.commentButtonDisabled} type="submit">Send</Button>
				</View>
			</form>
		)
	}
}

module.exports = Comment