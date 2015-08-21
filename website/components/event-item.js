var React = require('react')

class EventItem extends React.Component {
	render() {
		var event = this.props.event
		if(!event.category)
			event.category = 'other'
		
		return (
			<a className="event item" href={"/event/"+event.id}>
				<div className="basic-info">
					<span className="name">
						{event.title}
					</span>
					<span className="when">
						<span>{event.datetime}</span>
						<div>{event.location}</div>
					</span>
				</div>
				<div className={'summary ' + event.category}>
					<div className="category">
						{event.category}
					</div>
					<div className="info">
						<span className="people"><img className="icon" src="/images/person-white.png" /> 1 going</span>
						<span className="time"><img className="icon" src="/images/clock-white.png" /> {event.relativeTime}</span>
						<span className="location"><img className="icon" src="/images/white-pin.png" /> 6.1 mi</span>
					</div>
				</div>
			</a>
		)
	}
}

module.exports = EventItem