var React = require('react')
  , Image = require('../../core/image')
  , View = require('../../core/view')
  , TextArea = require('react-textarea-autosize')

const ENTER = 13

var styles = {}

styles.form = {
	flexDirection:'row',
	backgroundColor:'#f4f4f4',
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#e6e6e6'
}

styles.image = {
	width:35,
	height:35,
	marginRight:10,
	borderRadius:4
}

styles.message = {
	flex:1,
	minHeight:35,
	padding:8,
	borderWidth:1,
	borderColor:'#ddd',
	fontSize:13
}

class Comment extends React.Component {
	handleEnter(e) {
		if(e.which == ENTER) {
			e.preventDefault()
			
			if(e.target.value)
				app.submit(React.findDOMNode(this.refs.form))
		}
	}
	render() {
		var event = this.props.event
		  , post = this.props.post
		  , user = this.props.user

		if(!user) return false

		return (
			<form style={styles.form} ref="form" action={'/event/'+event.id+'/posts/'+post.id+'/comment'} method="POST">
				<Image style={styles.image} src={'https://graph.facebook.com/'+user.fbid+'/picture'} />
				<TextArea style={styles.message} onKeyDown={this.handleEnter.bind(this)} name="message" placeholder="Write a comment..." />
			</form>
		)
	}
}

module.exports = Comment