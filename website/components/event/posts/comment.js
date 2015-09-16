var React = require('react')
  , View = require('../../core/view')
  , Text = require('../../core/text')
  , Link = require('../../core/link')
  , Image = require('../../core/image')
  , timeUtil = require('../../../util/time')

var styles = {}

styles.comment = {
	flexDirection:'row',
	backgroundColor:'#f4f4f4',
	padding:10,
	borderTopWidth:1,
	borderTopColor:'#e6e6e6',
	alignItems:'center'
}

styles.image = {
	width:35,
	height:35,
	marginRight:10,
	borderRadius:4
}

styles.message = {
	fontSize:13,
	flex:1
}

styles.name = {
	fontWeight:600,
	marginRight:4
}

styles.time = {
	color:'#999',
	marginLeft:4,
	fontSize:11
}

class Comment extends React.Component {
	render() {
		var comment = this.props.comment

		return (
			<View style={styles.comment}>
				<Link href={'/profile/'+comment.user.id}>
					<Image style={styles.image} src={'https://graph.facebook.com/'+comment.user.fbid+'/picture'} />
				</Link>
				<Text style={styles.message}>
					<Link href={'/profile/'+comment.user.id} style={styles.name}>{comment.user.name.first}</Link> 
					{comment.message} 
					<Text style={styles.time}>{timeUtil.format(comment.time)}</Text>
				</Text>
			</View>
		)
	}
}

module.exports = Comment