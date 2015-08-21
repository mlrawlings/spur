var React = require('react')
  , Layout = require('./layout')
  , EventList = require('./event-list')

class CreateEventForm extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<div className="page">
					<section className="events-search"></section>
					<form method="POST" action="/create/event" className="createEvent">
						<div className="field">
							<label required>Event Title</label>
							<input name="title" type="text" required />
						</div>
						<div className="field">
							<label required>Time</label>
							<input name="datetime" type="time" required />
						</div>
						<div className="field location">
							<label required>Location</label>
							<input name="location" type="text" required />
							<div className="mapContainer">
								<div id="mapCover"></div>
								<div id="map">
								</div>
							</div>
						</div>
						<div className="field">
							<label required>Category</label>
							<select name="category" required>
								<option value="outdoors">travel & outdoors</option>
								<option value="food">food & leisure</option>
								<option value="sports">sports & fitness</option>
								<option value="games">games & hobbies</option>
								<option value="volunteer">volunteer & community</option>
								<option value="">other</option>
							</select>
						</div>

						<button type="submit">Create Event</button>
					</form>
				</div>
			</Layout>
		)
	}
}

module.exports = CreateEventForm