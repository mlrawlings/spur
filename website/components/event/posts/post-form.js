var React = require('react')
  , Button = require('../../core/button')
  , View = require('../../core/view')
  , TextArea = require('react-textarea-autosize')

var styles = {}

styles.form = {
	marginBottom: 30,
	alignItems: 'flex-end',
	borderWidth:1,
	borderColor:'#ddd'
}
styles.message = {
	borderWidth: 0,
	width: '100%',
	padding: 10,
	backgroundColor: '#fff',
	minHeight: 60,
	resize:'none'
}
styles.bar = {
	padding: 5,
	width: '100%',
	backgroundColor: '#f4f4f4',
	alignItems: 'flex-end'
}

class PostForm extends React.Component {
	submitPost(e) {
		if(!React.findDOMNode(this.refs.message).value)
			e.preventDefault()
	}
	render() {
		var event = this.props.event
		  , user = this.props.user

		if(!user) return false

		return (
			<form style={styles.form} action={'/event/'+event.id+'/post'} method="POST">
				<TextArea ref="message" style={styles.message} name="message" placeholder="Write something..." />
				<View style={styles.bar}>
					<Button src="/images/post.png" onClick={this.submitPost.bind(this)} type="submit">Post</Button>
				</View>
			</form>
		)
	}
}

module.exports = PostForm