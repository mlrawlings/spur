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
	fontSize:30,
	textAlign:'center'
}

styles.free = {
	fontWeight:400
}

styles.links = {
	flexDirection:'row',
	flexWrap:'wrap',
	justifyContent:'center'
}

styles.link = {
	marginLeft:10,
	marginRight:10,
	marginTop:15,
	height:45,
	background:'#222',
	alignItems:'center',
	justifyContent:'center',
	borderRadius:4,
	cursor:'pointer'
}

styles.linkInactive = {
	...styles.link,
	opacity:0.6,
	cursor:'default'
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
				<Text style={styles.heading}>Coming Soon to Your Mobile Device for <Text style={styles.free}>Free</Text></Text>
				<View style={styles.links}>
					<View style={styles.linkInactive}><Image style={styles.linkImage} src="/images/app-store.png" /></View>
					<View style={styles.linkInactive}><Image style={styles.linkImage} src="/images/google-play.png" /></View>
					{/*<Link style={styles.link}><Text style={styles.linkText}>Share</Text></Link>*/}
				</View>
			</Section>
		)
	}
}

module.exports = DownloadAndShare