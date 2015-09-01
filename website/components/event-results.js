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
	marginTop:15
}

styles.text = {
	color:'#ddd',
	paddingLeft:8,
	paddingRight:8
}

styles.field = {
	color:'#fff',
	borderWidth:0,
	borderBottomStyle: 'dashed',
	borderBottomWidth: 1,
	borderBottomColor: '#999',
	backgroundColor: '#444'
}

styles.results = {
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
	background:'#e5e5e5',
	paddingTop:15,
	paddingBottom:15
}

styles.resultText = {
	flexDirection:'row'
}

class EventResults extends React.Component {
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var numEvents = this.props.events.length

		return (
			<Layout fbid={this.props.fbid}>
				<Section style={styles.search}>
					<form ref="form" action="/events">
						<View style={styles.searchWrapper}>
							<SearchInput name="q" defaultValue={this.props.search} style={styles.searchField} />
						</View>
						<View style={styles.where}>
							<Text style={styles.text}>within</Text>
							<select  style={{ ...styles.text, ...styles.field }} onChange={this.submitForm.bind(this)} name="radius" defaultValue={this.props.radius}>
								<option value={1}>1 mile</option>
								<option value={3}>3 miles</option>
								<option value={5}>5 miles</option>
								<option value={10}>10 miles</option>
								<option value={25}>25 miles</option>
								<option value={50}>50 miles</option>
							</select>
							<Text style={styles.text}>of</Text>
							<Link style={{ ...styles.text, ...styles.field }}>{this.props.location.name}</Link>
						</View>
					</form>
				</Section>

				<Section style={styles.results}>
					<Text style={styles.resultText}>{(numEvents || 'No') + (numEvents == 1 ? ' event' : ' events') + ' found.' }</Text> 
					<Button href="/create/event">
						<Text>Create an event</Text>
					</Button>
				</Section>

				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = EventResults
