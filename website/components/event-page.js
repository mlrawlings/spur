var React = require('react')
  , EventItem = require('./event-item')
  , Layout = require('./layout')

class EventPage extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<div className="event page">
					<section className="map">
					</section>

					<div className="summary volunteer">
						<div className="content">
							<div className="category">
								volunteer &amp; community
							</div>
							<div className="info">
								<span className="people"><img className="icon" src="/images/person-white.png" /> 1 going</span>
								<span className="time"><img className="icon" src="/images/clock-white.png" /> {this.props.event.relativeTime}</span>
								<span className="location"><img className="icon" src="/images/white-pin.png" /> 6.1 mi</span>
							</div>
						</div>
					</div>

					<section className="header">
						<div className="content">
							<div className="basic-info">
								<div className="name">
									{this.props.event.title}
								</div>
								<div className="when">
									<time>{this.props.event.datetime}</time>
									<span className="period">This Afternoon</span>
								</div>
								<div className="share">
									<div className="addthis_sharing_toolbox"></div>
								</div>
							</div>
							<div className="location">
								<strong>River's Edge Sports Complex</strong>
								<address>{this.props.event.location}</address>
								<button>I'm in!</button>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		)
	}
}

module.exports = EventPage