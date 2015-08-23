var React = require('react')
  , Layout = require('./layout')
  , LocationInput = require('./inputs/location-input')
  , CategoryInput = require('./inputs/category-input')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Label = require('./common/label')
  , View = require('./common/view')

class CreateEventForm extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<Section>
					<form method="POST" action="/create/event" className="createEvent">
						<View>
							<Label required={true}>Event Title</Label>
							<input name="title" type="text" required={true} />
						</View>
						<View>
							<Label required={true}>Time</Label>
							<input name="datetime" type="time" required={true} />
						</View>
						<View>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" required={true} />
						</View>
						<View>
							<Label required={true}>Location</Label>
							<LocationInput name="location" required={true} />
						</View>

						<Button type="submit">Create Event</Button>
					</form>
				</Section>
			</Layout>
		)
	}
}

module.exports = CreateEventForm