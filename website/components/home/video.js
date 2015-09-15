var React = require('react')
  , Section = require('../layout/section')
  , View = require('../core/view')

var styles = {}

styles.container = {
	background:'#444'
}

styles.aspect = {
	backgroundColor:'#000',
	paddingBottom:'56.25%',
	height:0,
	width:'100%'
}

styles.video = {
	position:'absolute',
	top:0, left:0, right:0, bottom:0,
	height:'100%',
	width:'100%',
	border:0,
}

class Video extends React.Component {
	render() {
		return (
			<Section style={styles.container}>
				<View style={styles.aspect}>
					<iframe style={styles.video} src="https://www.youtube.com/embed/HXTpJ9CZTMU?modestbranding=1&autohide=1&showinfo=0&rel=0" frameborder="0" allowfullscreen></iframe>
				</View>
			</Section>
		)
	}
}

module.exports = Video