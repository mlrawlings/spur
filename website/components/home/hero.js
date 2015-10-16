var React = require('react')
  , SearchInput = require('../input/search-input')
  , Section = require('../layout/section')
  , Button = require('../core/button')
  , Image = require('../core/image')
  , Text = require('../core/text')

var styles = {}

styles.hero = {
	paddingTop:60,
	paddingBottom:60,
	alignItems: 'center',
	backgroundColor:'#555',
	backgroundImage:'url(\'/images/slackline.jpg\')',
	backgroundSize: 'cover',
	backgroundPosition: 'center center',
}

styles.logo = {
	width:180,
	height:70
}

styles.tagline = {
	fontWeight:300,
	fontSize:35,
	color:'#fff',
	textAlign:'center'
}

styles.about = {
	fontSize:20,
	color:'#fff',
	textAlign:'center',
	marginTop:20
}

class Hero extends React.Component {
	render() {
		return (
			<Section style={styles.hero}>
				<Image style={styles.logo} src="/images/spur-text-white.png" alt="spur" />
				<Text style={styles.tagline}>live in the moment</Text>
				<Text style={styles.about}>
					Easily discover, create, and share spontaneous events.  
					Hang out with friends and meet people while doing stuff you love.
				</Text>
			</Section>
		)
	}
}

module.exports = Hero