var React = require('react')
  , Button = require('./common/button')
  , View = require('./common/view')
  , Text = require('./common/text')
  , Image = require('./common/image')
  , TextArea = require('react-textarea-autosize')
  , timeUtil = require('../util/time')

const ENTER = 13

var styles = {}

styles.postForm = {
	marginBottom: 20,
	alignItems: 'flex-end',
	borderWidth:1,
	borderColor:'#ddd'
}
styles.postTextarea = {
	borderWidth: 0,
	width: '100%',
	padding: 10,
	backgroundColor: '#fff',
	minHeight: 60,
	resize:'none'
}
styles.postBar = {
	padding: 5,
	width: '100%',
	backgroundColor: '#f4f4f4',
	alignItems: 'flex-end'
}
styles.postButton = {
	width: 80
}

styles.postContainer = {
	marginTop:15,
	marginBottom:15,
	borderWidth:1,
	borderColor:'#ddd'
}

styles.post = {
	backgroundColor:'#fff',
	padding:10
}

styles.postHeading = {
	flexDirection:'row',
}

styles.postImage = {
	marginRight:10,
}

styles.postData = {
	flex:1,
	justifyContent:'center'
}

styles.postName = {
	fontWeight:600,
}

styles.postTime = {
	fontSize:13,
	color:'#888'
}

styles.postContent = {
	marginTop:10
}

styles.comment = 
styles.commentForm = {
	flexDirection:'row',
	backgroundColor:'#f4f4f4',
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#ddd'
}

styles.commentImage = {
	width:35,
	height:35,
	marginRight:10
}

styles.commentTextarea = {
	flex:1,
	minHeight:35,
	padding:8,
	borderWidth:1,
	borderColor:'#ddd',
	fontSize:13
}

class Posts extends React.Component {
	handleCommentKeyDown(postId, e) {
		var form = React.findDOMNode(this.refs['commentForm'+postId])

		if(e.which == ENTER) {
			e.preventDefault()
			form.submit()
		}
	}
	render() {
		var event = this.props.event
		  , user = this.props.user

		return (
			<View>
				<form style={styles.postForm} action={'/event/'+event.id+'/post'} method="POST">
					
					<TextArea style={styles.postTextarea} name="message" placeholder="Write something..." />
					<View style={styles.postBar}>
						<Button style={styles.postButton} type="submit">Post</Button>
					</View>
				</form>
				{event.posts.map((post) => {
					return (
						<View style={styles.postContainer}>
							<View style={styles.post}>
								<View style={styles.postHeading}>
									<Image style={styles.postImage} src={'https://graph.facebook.com/'+post.user.fbid+'/picture'} />
									<View style={styles.postData}>
										<Text style={styles.postName}>{post.user.name.full}</Text>
										<Text style={styles.postTime}>{timeUtil.format(post.time)}</Text>
									</View>
								</View>
								<Text style={styles.postContent}>{post.message}</Text>
							</View>
							<View style={styles.comments}>
								{(post.comments || []).map((comment) => {
									return <View style={styles.comment}>
										<Image style={styles.commentImage} src={'https://graph.facebook.com/'+comment.user.fbid+'/picture'} />
										<Text style={styles.commentMessage}><Text>{comment.user.name.first}</Text> {comment.message} <Text>{timeUtil.format(comment.time)}</Text></Text>
									</View>
								})}
								{user && <form style={styles.commentForm} ref={'commentForm'+post.id} action={'/event/'+event.id+'/posts/'+post.id+'/comment'} method="POST">
									<Image style={styles.commentImage} src={'https://graph.facebook.com/'+user.fbid+'/picture'} />
									<TextArea style={styles.commentTextarea} onKeyDown={this.handleCommentKeyDown.bind(this, post.id)} name="message" placeholder="Write a comment..." />
								</form>}
							</View>
						</View>
					)
				})}
			</View>
		)
	}
}

module.exports = Posts