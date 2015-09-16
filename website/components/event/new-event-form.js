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

styles.descriptionInput = {
	...Input.style,
	borderTopWidth:0
}

styles.optional = {
	fontSize:11,
	color:'#aaa'
}

class NewEventForm extends React.Component {
	componentDidMount() {
		React.findDOMNode(this.refs.name).focus()
	}
	render() {
		return (
			<Layout user={this.props.user}>
				<Section>
					<form method="POST" action="/create/event" className="createEvent">
						<View style={styles.field}>
							<Label required={true}>Name</Label>
							<Input ref="name" style={styles.titleInput} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>When</Label>
							<TimeInput name="time" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Where</Label>
							<LocationInput name="location" location={this.props.location} required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Category</Label>
							<CategoryInput name="category" required={true} />
						</View>
						<View style={styles.field}>
							<Label required={true}>Details <Text style={styles.optional}>(optional)</Text></Label>
							<TextArea name="description" style={styles.descriptionInput} placeholder="Anthing else people need to know..." />
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