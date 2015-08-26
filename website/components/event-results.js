var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')
  , SearchInput = require('./inputs/search-input')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Image = require('./common/image')
  , Link = require('./common/link')
  , View = require('./common/view')
  , Text = require('./common/text')

var styles = {}

styles.search = {
	backgroundColor:'#444'
}

styles.searchWrapper = {
	alignItems:'center'
}

styles.searchField = {
	width:'100%',
	maxWidth:450
}

styles.where = {
	flexDirection:'row',
	justifyContent:'center',
	marginTop:8
}

styles.text = {
	color:'#ddd',
	paddingLeft:8,
	paddingRight:8
}

styles.field = {
	color:'#fff',
	borderBottomStyle: 'dashed',
	borderBottomWidth: 1,
	borderBottomColor: '#999',
}

class EventResults extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<Section style={styles.search}>
					<form action="/events">
						<View style={styles.searchWrapper}>
							<SearchInput name="q" defaultValue={this.props.search} style={styles.searchField} />
						</View>
						<View style={styles.where}>
							<Text style={styles.text}>within</Text>
							<Link style={{ ...styles.text, ...styles.field }}>1 mile</Link>
							<Text style={styles.text}>of</Text>
							<Link style={{ ...styles.text, ...styles.field }}>Sanford Ave SW</Link>
						</View>
					</form>
				</Section>

				{/*<Section>
					<Button href="/create/event">
						<Text>Create Event +</Text>
					</Button>
				</Section>*/}

				<EventList events={this.props.events} />
			</Layout>
		)
	}
}

module.exports = EventResults
