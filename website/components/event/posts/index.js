var React = require('react')
  , Post = require('./post')
  , PostForm = require('./post-form')
  , View = require('../../core/view')

var styles = {}

class Posts extends React.Component {
	render() {
		var event = this.props.event
		  , user = this.props.user

		return (
			<View>
				<PostForm event={event} user={user} />
				{event.posts.map(post => <Post event={event} user={user} post={post} key={post.id} />)}
			</View>
		)
	}
}

module.exports = Posts