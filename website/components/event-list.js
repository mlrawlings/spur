var React = require('react')
  , EventItem = require('./event-item')

module.exports = React.createClass({
  render: function() {
    return <section className="events-list">
				<div className="content">
					<h3>Happening Soon</h3>
					{this.props.events.map(function(event) {
						return <EventItem event={event} />
					})}
				</div>
			</section>;
  }
})