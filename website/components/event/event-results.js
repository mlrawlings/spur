var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('./event-list')
  , EventSearchForm = require('./event-search-form')
  , Button = require('../core/button')
  , Text = require('../core/text')

var styles = {}

styles.results = {
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
	background:'#f2f2f2',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	paddingTop:15,
	paddingBottom:15
}

styles.resultText = {
	flexDirection:'row'
}

class EventResults extends React.Component {
	render() {
		var events = this.props.events
		  , search = this.props.search
		  , radius = this.props.radius
		  , location = this.props.location
		
		return (
			<Layout user={this.props.user}>
				<EventSearchForm search={search} radius={radius} location={location} />

				<Section style={styles.results}>
					<Text style={styles.resultText}>{(events.length || 'No') + (events.length == 1 ? ' event' : ' events') + ' found.' }</Text> 
					<Button href="/create/event">Create an event</Button>
				</Section>

				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = EventResults
