var React = require('react')
  , TextArea = require('react-textarea-autosize')
  , Layout = require('./layout')
  , LocationInput = require('./inputs/location-input')
  , CategoryInput = require('./inputs/category-input')
  , TimeInput = require('./inputs/time-input')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Label = require('./common/label')
  , View = require('./common/view')

var styles = {}

styles.field = {
	marginBottom:20
}

class CreateEventForm extends React.Component {
	render() {
		return (
			<Layout fbid={this.props.fbid}>
				<Section>
					<form method="POST" action="/create/event" className="createEvent">
						<View style={styles.field}>
							<Label required={true}>Event Title</Label>
							<input name="name" type="text" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Time</Label>
							<TimeInput name="time" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Location Name</Label>
							<input name="location[name]" type="text" />
						</View>
						<View style={styles.field}>
							<Label required={true}>Location Address</Label>
							<LocationInput name="location" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Description (optional)</Label>
							<TextArea name="description" />
						</View>

						<Button type="submit">Create Event</Button>
					</form>
				</Section>
			</Layout>
		)
	}
}

module.exports = CreateEventForm