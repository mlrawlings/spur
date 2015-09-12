var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , EventList = require('./event-list')
  , SearchInput = require('../input/search-input')
  , Button = require('../core/button')
  , Image = require('../core/image')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Text = require('../core/text')

var styles = {}

styles.container = {
	backgroundColor:'#444',
	borderColor:'#3e3e3e',
	borderBottomWidth:1,
	borderTopWidth:1
}

styles.search = {
	alignItems:'center'
}

styles.searchField = {
	width:'100%',
	maxWidth:450
}

styles.where = {
	flexDirection:'row',
	justifyContent:'center',
	marginTop:15
}

styles.text = {
	color:'#ddd',
	paddingLeft:8,
	paddingRight:8
}

styles.field = {
	color:'#fff',
	borderWidth:0,
	borderBottomStyle: 'dashed',
	borderBottomWidth: 1,
	borderBottomColor: '#999',
	backgroundColor: '#444'
}

class EventResults extends React.Component {
	submitForm() {
		app.submit(React.findDOMNode(this.refs.form))
	}
	render() {
		var radii = [1, 3, 5, 10, 25, 50]

		return (
			<Section style={styles.container}>
				<form ref="form" action="/events" method="GET">
					<View style={styles.search}>
						<SearchInput style={styles.searchField} name="q" defaultValue={this.props.search} />
					</View>
					<View style={styles.where}>
						<Text style={styles.text}>within</Text>
						<select  style={{ ...styles.text, ...styles.field }} onChange={this.submitForm.bind(this)} name="radius" defaultValue={this.props.radius}>
							{radii.map(r => <option value={r}>{r + ' ' + (r == 1 ? 'mile' : 'miles')}</option>)}
						</select>
						<Text style={styles.text}>of</Text>
						<Link style={{ ...styles.text, ...styles.field }}>{this.props.location.name}</Link>
					</View>
				</form>
			</Section>
		)
	}
}

module.exports = EventResults

