var React = require('react')
  , Comment = require('./comment')
  , CommentForm = require('./comment-form')
  , View = require('../../core/view')
  , Text = require('../../core/text')
  , Image = require('../../core/image')
  , timeUtil = require('../../../util/time')

var styles = {}

styles.container = {
	marginBottom:30,
	borderWidth:1,
	borderColor:'#ddd'
}

styles.post = {
	backgroundColor:'#fff',
	padding:10
}

styles.heading = {
	flexDirection:'row',
}

styles.image = {
	marginRight:10,
}

styles.data = {
	flex:1,
	justifyContent:'center'
}

styles.name = {
	fontWeight:600,
}

styles.time = {
	fontSize:13,
	color:'#888'
}

styles.content = {
	marginTop:10
}

class Post extends React.Component {
	render() {
		var event = this.props.event
		  , post = this.props.post
		  , user = this.props.user

		return (
			<View style={styles.container}>
				<View style={styles.post}>
					<View style={styles.heading}>
						<Image style={styles.image} src={'https://graph.facebook.com/'+post.user.fbid+'/picture'} />
						<View style={styles.data}>
							<Text style={styles.name}>{post.user.name.full}</Text>
							<Text style={styles.time}>{timeUtil.format(post.time)}</Text>
						</View>
					</View>
					<Text style={styles.content}>{post.message}</Text>
				</View>
				{post.comments.map(comment => <Comment comment={comment} />)}
				<CommentForm event={event} post={post} user={user} />
			</View>
		)
	}
}

module.exports = Post