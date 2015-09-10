var React = require('react')
  , Layout = require('./layout')
  , LocationInput = require('./inputs/location-input')
  , CategoryInput = require('./inputs/category-input')
  , TimeInput = require('./inputs/time-input')
  , Input = require('./common/input')
  , Section = require('./common/section')
  , Button = require('./common/button')
  , Label = require('./common/label')
  , View = require('./common/view')
  , Text = require('./common/text')

var styles = {}

styles.field = {
	marginBottom:30,
}

styles.fieldInfo = {
}

styles.formActions = {
	alignItems:'flex-end'
}

styles.helpText = {
	fontSize:13,
	color:'#666'
}

styles.titleInput = {
	fontWeight:300,
	fontSize:24
}

class CreateEventForm extends React.Component {
	componentDidMount() {
		React.findDOMNode(this.refs.name).focus()
	}
	render() {
		return (
			<Layout user={this.props.user}>
				<Section>
					<form method="POST" action="/create/event" className="createEvent">
						<View style={styles.field}>
							<View style={styles.fieldInfo}>
								<Label required={true}>Name</Label>
								<Text style={styles.helpText}>Keep it short, but descriptive.  You can add more info in a post after you create the event.</Text>
							</View>
							<Input ref="name" style={styles.titleInput} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.field}>
							<View style={styles.fieldInfo}>
								<Label required={true}>When</Label>
							</View>
							<TimeInput name="time" required={true} />
						</View>
						<View style={styles.field}>
							<View style={styles.fieldInfo}>
								<Label required={true}>Where</Label>
								<Text style={styles.helpText}>
									Enter an address and drag the pin to the exact meeting location.  
									Then give the location a name (something simple like "Starbucks on Main" or "New Hall - Room #308").
								</Text>
							</View>
							<LocationInput name="location" location={this.props.location} required={true} />
						</View>
						<View style={styles.field}>
							<View style={styles.fieldInfo}>
								<Label required={true}>Category</Label>
								<Text style={styles.helpText}>It's okay if there's not an exact match, just choose the one that best fits.  </Text>
							</View>
							<CategoryInput name="category" required={true} />
						</View>
						<View style={styles.formActions}>
							<Button type="submit">Create Event</Button>
						</View>
					</form>
				</Section>
			</Layout>
		)
	}
}

module.exports = CreateEventForm