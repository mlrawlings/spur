var React = require('react')
  , Post = require('./post')
  , PostForm = require('./post-form')
  , Heading = require('../../layout/heading')
  , View = require('../../core/view')

var styles = {}

styles.first = {
	marginTop:0
}

class Posts extends React.Component {
	render() {
		var { event, user, style } = this.props

		return (
			<View style={style}>
				{!!(user || event.posts.length) && <Heading>Discussion</Heading>}
				<PostForm event={event} user={user} />
				{event.posts.map((post, i) => 
					<Post event={event} user={user} post={post} style={!i ? styles.first : {}} key={post.id} />
				)}
			</View>
		)
	}
}

module.exports = Posts