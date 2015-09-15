var React = require('react')
  , Section = require('../layout/section')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')

var styles = {}

styles.container = {
	backgroundColor:'#fff',
	alignItems:'center'
}

styles.heading = {
	fontWeight:300,
	fontSize:30
}

styles.free = {
	fontWeight:400
}

styles.links = {
	flexDirection:'row',
	marginTop:15
}

styles.link = {
	marginLeft:10,
	marginRight:10,
	height:50,
	background:'#222',
	alignItems:'center',
	justifyContent:'center',
	borderRadius:4,
	cursor:'pointer'
}

styles.linkImage = {
	height:'100%'
}

styles.linkText = {
	color:'#fff',
	fontWeight:300,
	fontSize:25,
	paddingLeft:20,
	paddingRight:20
}

class DownloadAndShare extends React.Component {
	render() {
		return (
			<Section style={styles.container}>
				<Text style={styles.heading}>Also Available for <Text style={styles.free}>Free</Text> on Your Mobile Device</Text>
				<View style={styles.links}>
					<Link style={styles.link}><Image style={styles.linkImage} src="/images/app-store.png" /></Link>
					<Link style={styles.link}><Image style={styles.linkImage} src="/images/google-play.png" /></Link>
					<Link style={styles.link}><Text style={styles.linkText}>Share</Text></Link>
				</View>
			</Section>
		)
	}
}

module.exports = DownloadAndShare