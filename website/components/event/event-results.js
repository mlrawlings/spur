var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , GooglePlaceInput = require('../input/google-place-input')
  , EventList = require('./event-list')
  , Button = require('../core/button')
  , Input = require('../core/input')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , cookie = require('tiny-cookie')

var styles = {}

styles.results = {
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
	background:'#444',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	paddingTop:15,
	paddingBottom:15
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

styles.text = {
	color:'#eee'
}

class EventResults extends React.Component {
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	changeLocation(location) {
		React.findDOMNode(this.refs.location).value = JSON.stringify({
			name:location.formatted_address,
			coords:[location.geometry.location.lat(), location.geometry.location.lng()]
		})
		this.submitForm()
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
					<form ref="form" action="/events" method="GET">
						<Text style={styles.text}>
							{(events.length || 'No') + (events.length == 1 ? ' event' : ' events') + ' found ' }
							within
							<select ref="radius" style={styles.field} onChange={this.submitForm.bind(this)} name="radius" defaultValue={this.props.radius}>
								{radii.map(r => <option value={r}>{r + ' ' + (r == 1 ? 'mile' : 'miles')}</option>)}
							</select>
							of
							<GooglePlaceInput style={styles.field} location={location} value={location.name} onChange={this.changeLocation.bind(this)} />
							<Input type="hidden" name="location" value={JSON.stringify(location)} ref="location" />
						</Text>
					</form>
					{user && <Button href="/create/event">Create an event</Button>}
				</Section>

				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = EventResults
