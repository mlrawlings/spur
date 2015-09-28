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

styles.optional = {
	fontSize:11,
	color:'#aaa',
	marginLeft:8
}

class NewEventForm extends React.Component {
	componentDidMount() {
		React.findDOMNode(this.refs.eventName).focus()
	}
	changeLocation(place) {
		React.findDOMNode(this.refs.locationName).value = place.name || ''
	}
	render() {
		return (
			<Layout user={this.props.user}>
				<Section>
					<form method="POST" action="/create/event" autoComplete="false">
						<View style={styles.field}>
							<Label required={true}>Event Name</Label>
							<Input ref="eventName" style={styles.titleInput} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Time</Label>
							<TimeInput name="time" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Location Address</Label>
							<LocationInput name="location" location={this.props.location} required={true} onChange={this.changeLocation.bind(this)} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Location Name</Label>
							<Input ref="locationName" name="location[name]" type="text" placeholder="Name this place..." required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Additional Details <Text style={styles.optional}>(optional)</Text></Label>
							<TextArea name="description" style={Input.style} placeholder="Anthing else people need to know..." />
						</View>
						<View style={styles.actions}>
							<Button type="submit">Create Event</Button>
						</View>
					</form>
				</Section>
			</Layout>
		)
	}
}

module.exports = NewEventForm