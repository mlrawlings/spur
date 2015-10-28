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
	display: 'inline-block',
	color:'#888',
	textDecoration:'underline'
}

class EventList extends React.Component {
	render() {
		var { timezoneOffset } = this.context 
		  , { location, events, noEventsText } = this.props
		  , previousTimeClass
		
		return (
			<Section>
				{events.length ? events.map((event, index) => {
					var timeClass = time.getTimeClass(event.time, timezoneOffset)

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
				}) : (noEventsText ? (
						<Text style={styles.noEvents}>
							{noEventsText}
						</Text>
					) :	(
						<Text style={styles.noEvents}>
							Nothing&apos;s happening nearby.  Why not <Link style={styles.createLink} href="/create/event">create your own event</Link>?
						</Text>
					)
				)}
			</Section>
		)
	}
}

EventList.contextTypes = {
	timezoneOffset:React.PropTypes.number
}

module.exports = EventList