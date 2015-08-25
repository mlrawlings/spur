var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , time = require('../util/time')

class EventList extends React.Component {
	render() {
		var previousTimeClass
		return (
			<Section>
				{this.props.events.map(function(event) {
					var timeClass = time.getTimeClass(event.time)

					if(previousTimeClass == timeClass) {
						return <EventItem event={event} key={event.id} />
					} else {
						return [
							<Heading key={timeClass}>
								{timeClass}
							</Heading>, 
							<EventItem event={event} key={event.id} />
						]
					}
				})}
			</Section>
		)
	}
}

module.exports = EventList