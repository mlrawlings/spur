var React = require('react')
  , Input = require('../core/input')
  , View = require('../core/view')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')

var styles = {}

styles.container = {
	flexDirection:'row'
}

styles.day = {
	borderLeftWidth:0
}

styles.text = {
	fontSize:13
}

styles.error = {
	color:'#c00'
}

class LocationInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: timeUtil.anHourFromNow(true)
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
				<View style={styles.container}>
					<Input type="time" style={styles.time} value={time} onChange={this.changeTime.bind(this)} />
					<Input type="select" ref="day" style={styles.day} value={day} onChange={this.changeDay.bind(this)}>
						<option value="today">Today</option>
						<option value="tomorrow">Tomorrow</option>
					</Input>
				</View>
				<Text style={styles.text}>
					{error && <Text style={styles.error}>Error! You cannot post an event in the past.</Text>}
				</Text>
				<Input name="time" value={this.state.time.toJSON()} type="hidden" />
			</View>
		)
	}
}

module.exports = LocationInput