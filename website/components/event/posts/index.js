var React = require('react')
  , Post = require('./post')
  , PostForm = require('./post-form')
  , Heading = require('../../layout/heading')
  , View = require('../../core/view')

var styles = {}

class Posts extends React.Component {
	render() {
		var { event, user, style } = this.props

		return (
			<View style={style}>
				<Heading>Discussion</Heading>
				<PostForm event={event} user={user} />
				{event.posts.map(post => <Post event={event} user={user} post={post} key={post.id} />)}
			</View>
		)
	}
}

module.exports = Posts