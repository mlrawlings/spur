var React = require('react')
  , EventItem = require('./event-item')

class EventList extends React.Component {
	render() {
		return (
			<section className="events-list">
				<div className="content">
					<h3>Happening Soon</h3>
					{this.props.events.map(function(event) {
						return <EventItem event={event} />
					})}
				</div>
			</section>
		)
	}
}

module.exports = EventList