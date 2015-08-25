var React = require('react')
  , GeoPoint = require('geopoint')
  , GoogleMap = require('google-map-react')
  , Image = require('../common/image')
  , View = require('../common/view')
  , locationUtil = require('../../util/location')

var style = {}

function anHourFromNow() {
	var now = new Date()
	return new Date()
}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date()
		}
	}
	componentDidMount() {
		
	}
	changeTime(e) {
		var time = this.state.time
		  , parts = e.target.value.split(':')
		  , hours = parseInt(parts[0])
		  , minutes = parseInt(parts[1])
		
		if(!isNaN(hours))
			time.setHours(hours)

		if(!isNaN(minutes))
			time.setMinutes(minutes)

		this.setState({ time })
	}
	changeDay(e) {
		var time = this.state.time

		if(e.target.value == 'tomorrow')
			time.setDate(time.getDate() + 1)

		if(e.target.value == 'today')
			time.setDate(time.getDate() - 1)

		this.setState({ time })
	}
	render() {
		var hours = this.state.time.getHours()
		  , minutes = this.state.time.getMinutes()
		  , day = this.state.time.getDate() == new Date().getDate() ? 'today' : 'tomorrow'

		if(hours <= 9) hours = '0' + hours
		if(minutes <= 9) minutes = '0' + minutes

		var time = hours + ':' + minutes
		  , error = this.state.time < new Date()

		return (
			<View>
				<input type="time" value={time} onChange={this.changeTime.bind(this)} />
				<select ref="day" value={day} onChange={this.changeDay.bind(this)}>
					<option value="today">Today</option>
					<option value="tomorrow">Tomorrow</option>
				</select>
				<input name="time" value={this.state.time.toJSON()} type="hidden" />
				{error && <View>Error! You can't post an event in the past.</View>}
			</View>
		)
	}
}

module.exports = LocationInput