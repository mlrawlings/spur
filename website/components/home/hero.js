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
	fontSize:40,
	color:'#fff'
}

styles.searchForm = {
	width:'100%',
	maxWidth:450,
	marginTop:16
}

styles.searchInput = {
	width:'100%'
}

class Hero extends React.Component {
	render() {
		return (
			<Section style={styles.hero}>
				<Image style={styles.logo} src="/images/spur-text-white.png" alt="spur" />
				<Text style={styles.tagline}>live in the moment</Text>
				<form action="/events" style={styles.searchForm}>
					<SearchInput name="q" style={styles.searchInput} />
				</form>
			</Section>
		)
	}
}

module.exports = Hero