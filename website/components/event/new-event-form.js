var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Label = require('../layout/label')
  , LocationInput = require('../input/location-input')
  , CategoryInput = require('../input/category-input')
  , TextArea = require('react-textarea-autosize')
  , TimeInput = require('../input/time-input')
  , Input = require('../core/input')
  , Button = require('../core/button')
  , View = require('../core/view')
  , Text = require('../core/text')

var styles = {}

styles.field = {
	marginBottom:30,
}

styles.actions = {
	alignItems:'flex-end'
}

styles.titleInput = {
	fontWeight:300,
	fontSize:24
}

class NewEventForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	changeLocation(location) {
		this.setState({ location })
		var node = React.findDOMNode(this.refs.locationName)
		if(node) node.value = location && location.name || ''
	}
	render() {
		var location = this.state.location

		return (
			<Layout user={this.props.user}>
				<Section>
					<form method="POST" action="/create/event" autoComplete="false">
						<View style={styles.field}>
							<Label required={true}>Event Name</Label>
							<Input style={styles.titleInput} maxLength={64} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Start Time</Label>
							<TimeInput name="time" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>{location ? 'Location Address' : 'Location'}</Label>
							<LocationInput name="location" location={this.props.location} required={true} onChange={this.changeLocation.bind(this)} />
						</View>
						{location && <View style={styles.field}>
							<Label>Location Name</Label>
							<Input ref="locationName" maxLength={48} name="location[name]" type="text" defaultValue={location.name} placeholder={"Add name, apartment #, field..."} />
						</View>}
						<View style={styles.field}>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" required={true} />
						</View>
						<View style={styles.field}>
							<Label>Additional Details</Label>
							<TextArea name="details" style={Input.style} placeholder="Anthing else people need to know..." />
						</View>
						<View style={styles.actions}>
							<Button src="/images/create.png" type="submit">Create Event</Button>
						</View>
					</form>
				</Section>
			</Layout>
		)
	}
}

module.exports = NewEventForm