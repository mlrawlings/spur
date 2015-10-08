var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , PlaceInput = require('../input/place-input')
  , EventList = require('./event-list')
  , GetLocation = require('./get-location')
  , Button = require('../core/button')
  , Input = require('../core/input')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , Form = require('../core/form')

var styles = {}

styles.results = {
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
	background:'#444',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	paddingTop:8,
	paddingBottom:8,
	flexWrap:'wrap'
}

styles.field = {
	color:'#fff',
	borderWidth:0,
	fontWeight:600,
	borderBottomStyle: 'dashed',
	borderBottomWidth: 1,
	borderBottomColor: '#999',
	backgroundColor: '#444',
	cursor:'pointer',
	marginLeft:8,
	marginRight:8,
	padding:0
}

styles.addressField = {
	...styles.field,
	width:250
}

styles.form = {
	maxWidth:'100%',
	paddingTop:8,
	paddingBottom:8,
	alignItems: 'center',
	justifyContent: 'center',
	flexWrap: 'wrap',
	flexDirection: 'row'
}

styles.text = {
	color:'#eee'
}

styles.spacer = {
	flex:100
}

styles.buttonContainer = {
	flexGrow:1,
	alignItems:'center',
	paddingTop:8,
	paddingBottom:8
}

class EventResults extends React.Component {
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	changeLocation(location) {
		this.refs.placeInput.setState({ value:location.full })
		React.findDOMNode(this.refs.location).value = JSON.stringify({
			name:location.full,
			coords:location.coords
		})
		this.submitForm()
	}
	focusPlaceInput() {
		this.refs.placeInput.focus()
	}
	componentWillReceiveProps(nextProps) {
		React.findDOMNode(this.refs.radius).value = nextProps.radius
	}
	render() {
		var { events, user, radius, location } = this.props
		  , radii = [1, 3, 5, 10, 25, 50]

		return (
			<Layout user={this.props.user}>
				<Section style={styles.results}>
					<Form style={styles.form} ref="form" action="/" method="GET">
						<Text style={styles.text}>
							{(events.length || 'No') + (events.length == 1 ? ' event' : ' events') + ' found within' }
						</Text>
						<Input type="select" ref="radius" style={styles.field} onChange={this.submitForm.bind(this)} name="radius" defaultValue={this.props.radius}>
							{radii.map(r => <option key={r} value={r}>{r + ' ' + (r == 1 ? 'mile' : 'miles')}</option>)}
						</Input>
						<Text style={styles.text}>of</Text>
						<PlaceInput ref="placeInput" style={styles.addressField} location={location} defaultValue={location && location.name} onChange={this.changeLocation.bind(this)} />
						<Input type="hidden" name="location" value={JSON.stringify(location)} ref="location" />
					</Form>
					<View style={styles.spacer} />
					{user && <View style={styles.buttonContainer}>
						<Button src="/images/create.png" href="/create/event">Create an event</Button>
					</View>}
				</Section>

				{this.props.location ? 
					<EventList events={this.props.events} location={this.props.location} user={this.props.user} />
					: <GetLocation onDetect={this.changeLocation.bind(this)} onEnter={this.focusPlaceInput.bind(this)} />
				}
				
			</Layout>
		)
	}
}

module.exports = EventResults
