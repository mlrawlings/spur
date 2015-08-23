var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('./common/section')
  , Heading = require('./common/heading')

class EventList extends React.Component {
	render() {
		return (
			<Section>
				<Heading>Happening Soon</Heading>
				{this.props.events.map(function(event) {
					return <EventItem event={event} key={event.id} />
				})}
			</Section>
		)
	}
}

module.exports = EventList