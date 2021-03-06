var React = require('react')
  , Section = require('./section')
  , Text = require('../core/text')

var styles = {}

styles.footer = {
	backgroundColor: '#e0e0e0',
	paddingTop:15,
	paddingBottom:15,
	alignItems: 'center',
	borderTopWidth:1,
	borderTopColor:'#ddd'
}

styles.copyright = {
	fontSize:12,
	color:'#999'
}

styles.privacy = {
	textDecoration:'underline',
	marginLeft:8
}

class PageFooter extends React.Component {
	render() {
		return (
			<Section style={styles.footer}>
				<Text style={styles.copyright}>
					Made with &hearts; by Embark in Roanoke, VA. 
					<Text style={styles.privacy} href="https://www.iubenda.com/privacy-policy/922529">Privacy Policy</Text>
				</Text>
			</Section>
		)
	}
}

module.exports = PageFooter