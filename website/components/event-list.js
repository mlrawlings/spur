var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('./common/section')
  , Heading = require('./common/heading')
  , time = require('../util/time')

var styles = {}

styles.heading = {
	marginTop:20
}

class EventList extends React.Component {
	render() {
		var previousTimeClass
		return (
			<Section>
				{this.props.events.map((event, index) => {
					var timeClass = time.getTimeClass(event.time)

					if(previousTimeClass == timeClass) {
						return <EventItem event={event} key={event.id} />
					} else {
						previousTimeClass = timeClass
						return [
							<Heading key={timeClass} style={!!index && styles.heading}>
								{timeClass}
							</Heading>, 
							<EventItem event={event} key={event.id} location={this.props.location} />
						]
					}
				})}
			</Section>
		)
	}
}

module.exports = EventList