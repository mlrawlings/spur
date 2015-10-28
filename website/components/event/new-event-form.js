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
  , timeUtil = require('../../util/time')
  , UserActionButton = require('../button/user-action-button')

var styles = {}

styles.timesDivider = {
	margin: 10,
	marginTop: 31,
	fontSize:12,
	color:'#aaa'
}

styles.fieldset = {
	flexDirection: 'row',
	flexWrap: 'wrap',
	maxWidth: '100%'
}

styles.field = {
	marginBottom:30,
}

styles.subfield = {
	marginTop:5,
}

styles.actions = {
	alignItems:'flex-end'
}

styles.titleInput = {
	fontWeight:300,
	fontSize:24
}

styles.toggleEndTime = {
	marginLeft: 5,
	textDecoration: 'underline',
	color: 'rgb(4, 165, 180)',
	cursor: 'pointer'
}

styles.remove = {
	marginLeft: 5,
	textDecoration: 'underline',
	color: '#c00',
	cursor: 'pointer'
}

styles.link = {
	fontSize: 12,
	textDecoration: 'underline',
	color: 'rgb(4, 165, 180)',
	cursor: 'pointer'
}

styles.startedTime = {
	...Input.style,
	backgroundColor: '#f5f5f5',
	color: '#888',
	cursor: 'not-allowed',
	lineHeight: 1.5
}

class NewEventForm extends React.Component {
	constructor(props) {
		super(props)
		var { event } = props
		this.state = { 
			location:event && event.location, 
			time:event && event.time || timeUtil.anHourFromNow(true),
			hasEnd:!!(event && event.endTime),
			showEndTime: !!(event && event.endTime) ? true : false,
			hasMax:!!(event && event.max),
			showMax: !!(event && event.max) ? true : false
		}
	}
	changeTime(time) {
		this.setState({ time })
	}
	changeLocation(location) {
		var node = React.findDOMNode(this.refs.locationName)
		
		if(node && this.state.location && location && this.state.location.full != location.full)
			node.value = location && location.name || ''

		this.setState({ location })
	}
	preventSubmit(e) {
		if(e.keyCode == 13)
			e.preventDefault()
	}
	addEndTime() {
		this.setState({ showEndTime:true })
	}
	removeEndTime() {
		this.setState({ showEndTime:false })
	}
	showMax() {
		this.setState({ showMax:true })
	}
	hideMax() {
		this.setState({ showMax:false })
	}
	submit(e) {
		e.preventDefault()

		this.refs.userActionButton.trigger((done) => {
			app.submit(React.findDOMNode(this.refs.form)).then(done).catch(done)
		})
	}
	render() {
		var { location, time } = this.state
		  , { event } = this.props
		  , defaultEndTime = new Date(time)
		  , showStartTimeField = event ? (event && event.time > new Date()) : true

		defaultEndTime = this.state.hasEnd ? event.endTime : new Date(defaultEndTime.setHours(defaultEndTime.getHours()+1))
		return (
			<Layout>
				<Section>
					<Form ref="form" onSubmit={this.submit.bind(this)} action={event ? '/event/'+event.id+'/edit' : '/create/event'}>
						<View style={styles.field}>
							<Label required={true}>Event Name</Label>
							<Input style={styles.titleInput} defaultValue={event && event.name} onKeyDown={this.preventSubmit.bind(this)} maxLength={64} name="name" type="text" placeholder="Name this event..." required={true} />
						</View>
						<View style={styles.fieldset}>
							<View style={styles.field}>
								<Label required={true}>Start Time 
									{!this.state.showEndTime && 
										<Text style={styles.toggleEndTime} onClick={this.addEndTime.bind(this)}>Need an End Time?</Text>}
								</Label>
								{showStartTimeField ? <TimeInput name="time" defaultValue={time} err="The start time cannot be in the past." allowPast={true} display="relative" onChange={this.changeTime.bind(this)} onKeyDown={this.preventSubmit.bind(this)} required={true} />
									:
									[<View style={styles.startedTime}>{'Started ' + timeUtil.getRelativeTimeString(event.time, new Date(), true)}</View>,
									<Input type="hidden" name="time" value={event && event.time} />
									]
								}
							</View>
							{this.state.showEndTime &&
								[<Text style={styles.timesDivider}>to</Text>,
								<View style={styles.field}>
									<Label required={true}>End Time
										<Text style={styles.remove} onClick={this.removeEndTime.bind(this)}>Remove</Text>
									</Label>
									<TimeInput name="endTime" err="The end time must be after the start time." defaultValue={defaultEndTime} startTime={time} display="duration" onKeyDown={this.preventSubmit.bind(this)} />
								</View>]
							}
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
							{!this.state.showMax &&
								<View style={styles.subfield}>
									<Text style={styles.link} onClick={this.showMax.bind(this)}>Max People?</Text>	
								</View>
							}
						</View>
						{this.state.showMax &&
							<View style={styles.field}>
								<Label required={true}>
									Max People
									<Text style={styles.remove} onClick={this.hideMax.bind(this)}>Remove</Text>
								</Label>
								<Input name="max" type="number" min="2" defaultValue={(event && event.max) || 10} />
							</View>
						}
						<View style={styles.field}>
							<Label>Additional Details</Label>
							<Input type="textarea" name="details" defaultValue={event && event.details} style={Input.style} placeholder="Anthing else people need to know..." />
						</View>

						<View style={styles.actions}>
							<UserActionButton ref="userActionButton" tag={Button} src="/images/create.png" type='submit' actionName={event ? 'Save Event' : 'Create Event'}>
								{event ? 'Save Event' : 'Create Event'}
							</UserActionButton>
						</View>
					</Form>
				</Section>
			</Layout>
		)
	}
}

module.exports = NewEventForm