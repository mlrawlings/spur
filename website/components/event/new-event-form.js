var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Label = require('../layout/label')
  , LocationInput = require('../input/location-input')
  , CategoryInput = require('../input/category-input')
  , TimeInput = require('../input/time-input')
  , Input = require('../core/input')
  , Button = require('../core/button')
  , Form = require('../core/form')
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
		this.state = { location:props.event && props.event.location }
	}
	changeLocation(location) {
		this.setState({ location })
		var node = React.findDOMNode(this.refs.locationName)
		if(node) node.value = location && location.name || ''
	}
	preventSubmit(e) {
		if(e.keyCode == 13)
			e.preventDefault()
	}
	render() {
		var location = this.state.location
		  , event = this.props.event

		return (
			<Layout user={this.props.user}>
				<Section>
					<Form action={event ? '/event/'+event.id+'/edit' : '/create/event'}>
						<View style={styles.field}>
							<Label required={true}>Event Name</Label>
							<Input style={styles.titleInput} defaultValue={event && event.name} onKeyDown={this.preventSubmit.bind(this)} maxLength={64} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Start Time</Label>
							<TimeInput name="time" defaultValue={event && event.time} onKeyDown={this.preventSubmit.bind(this)} required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>{location ? 'Location Address' : 'Location'}</Label>
							<LocationInput name="location" noDetect={true} defaultValue={location} location={this.props.location} required={true} onChange={this.changeLocation.bind(this)} />
						</View>
						{location && <View style={styles.field}>
							<Label>Location Name</Label>
							<Input ref="locationName" onKeyDown={this.preventSubmit.bind(this)} maxLength={48} name="location[name]" type="text" defaultValue={location.name} placeholder={"Add name, apartment #, field..."} />
						</View>}
						<View style={styles.field}>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" defaultValue={event && event.category} required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Who can come?</Label>
							<Input name="private" required={true} type="select" defaultValue={event && event.private}>
								<option value={false}>Anyone | Makes it public to the Spur Community.</option>
								<option value={true}>Invite only | Share your event link with friends.</option>
							</Input>
						</View>
						<View style={styles.field}>
							<Label>Additional Details</Label>
							<Input type="textarea" name="details" defaultValue={event && event.details} style={Input.style} placeholder="Anthing else people need to know..." />
						</View>
						<View style={styles.actions}>
							<Button src="/images/create.png" type="submit">{event ? 'Save Event' : 'Create Event'}</Button>
						</View>
					</Form>
				</Section>
			</Layout>
		)
	}
}

module.exports = NewEventForm