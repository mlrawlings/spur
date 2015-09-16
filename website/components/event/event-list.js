var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Link = require('../core/link')
  , Text = require('../core/text')
  , time = require('../../util/time')

var styles = {}

styles.heading = {
	marginTop:20
}

styles.noEvents = {
	fontSize:30,
	color:'#999',
	textAlign:'center'
}

styles.createLink = {
	color:'#888',
	textDecoration:'underline'
}

class EventList extends React.Component {
	render() {
		var { location, events } = this.props
		  , previousTimeClass
		
		return (
			<Section>
				{events.length ? events.map((event, index) => {
					var timeClass = time.getTimeClass(event.time)

					if(previousTimeClass == timeClass) {
						return <EventItem event={event} key={event.id} location={location} />
					} else {
						previousTimeClass = timeClass
						return [
							<Heading key={timeClass} style={!!index && styles.heading}>
								{timeClass}
							</Heading>, 
							<EventItem event={event} key={event.id} location={location} />
						]
					}
				}) : (
					<Text style={styles.noEvents}>
						There are currently no events nearby.  Try increasing your radius or <Link style={styles.createLink} href="/create/event">create your own event</Link>.
					</Text>
				)}
			</Section>
		)
	}
}

module.exports = EventList