var React = require('react')
  , View = require('../../core/view')
  , Text = require('../../core/text')
  , Image = require('../../core/image')
  , timeUtil = require('../../../util/time')

var styles = {}

styles.comment = {
	flexDirection:'row',
	backgroundColor:'#f4f4f4',
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#e6e6e6'
}

styles.image = {
	width:35,
	height:35,
	marginRight:10
}

styles.message = {
	fontSize:13
}

class Comment extends React.Component {
	render() {
		var comment = this.props.comment

		return (
			<View style={styles.comment}>
				<Image style={styles.image} src={'https://graph.facebook.com/'+comment.user.fbid+'/picture'} />
				<Text style={styles.message}><Text>{comment.user.name.first}</Text> {comment.message} <Text>{timeUtil.format(comment.time)}</Text></Text>
			</View>
		)
	}
}

module.exports = Comment