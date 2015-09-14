var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('./event-list')
  , Button = require('../core/button')
  , Text = require('../core/text')
  , Link = require('../core/link')

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
	cursor:'pointer'
}

styles.text = {
	color:'#eee',
	marginLeft:8,
	marginRight:8
}

class EventResults extends React.Component {
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var events = this.props.events
		  , search = this.props.search
		  , radius = this.props.radius
		  , location = this.props.location
		  , radii = [1, 3, 5, 10, 25, 50]
		
		return (
			<Layout user={this.props.user}>
				<Section style={styles.results}>
					<form ref="form" action="/events" method="GET">
						<Text style={styles.text}>
							{(events.length || 'No') + (events.length == 1 ? ' event' : ' events') + ' found ' }
							within
							<select style={{ ...styles.text, ...styles.field }} onChange={this.submitForm.bind(this)} name="radius" defaultValue={this.props.radius}>
								{radii.map(r => <option value={r}>{r + ' ' + (r == 1 ? 'mile' : 'miles')}</option>)}
							</select>
							of
							<Link style={{ ...styles.text, ...styles.field }}>
								{this.props.location.name}
							</Link>
						</Text>
					</form>
					<Button href="/create/event">Create an event</Button>
				</Section>

				<EventList events={this.props.events} location={this.props.location} />
			</Layout>
		)
	}
}

module.exports = EventResults
