var React = require('react')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Image = require('./common/image')
  , Text = require('./common/text')

var styles = {}

styles.hero = {
	paddingTop:60,
	paddingBottom:60,
	alignItems: 'center',
	backgroundColor:'#555',
	backgroundImage:'url(\'/images/slackline.jpg\')',
	backgroundSize: 'cover',
	backgroundPosition: 'center center',
	color:'#fff',
}

styles.logo = {
	width:180,
	height:70
}

styles.tagline = {
	fontWeight:300,
	fontSize:40
}

styles.icon = {
	width:20,
	height:20
}

class Hero extends React.Component {
	render() {
		return (
			<Section style={styles.hero}>
				<Image style={styles.logo} src="/images/spur-text-white.png" alt="spur" />
				<Text style={styles.tagline}>live in the moment</Text>
				<form action="/events" className="search">
					<input name="q" type="text" placeholder="what do you want to do?" />
					<Button type="submit">
						<Image style={styles.icon} src="/images/search-white.png" />
					</Button>
				</form>
			</Section>
		)
	}
}

module.exports = Hero