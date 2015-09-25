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
	componentWillMount() {
		try {
			var input = document.createElement("input")

		    input.type = "time"
			
			this.supportsTimeInput = input.type == 'time'
		} catch(e) {
			this.supportsTimeInput = false
		}
	}
	reformatTime(e) {
		if(!this.supportsTimeInput)
			e.target.value = timeUtil.format(this.state.time)
	}
	changeTime(e) {
		try {
			var time = timeUtil.parseTime(e.target.value, this.state.time)

			this.setState({ time, error:null })
		} catch(e) {
			this.setState({ error:e })
		}
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
		  , timeString = this.supportsTimeInput ? time : timeUtil.format(this.state.time)
		  , error = this.state.error || (this.state.time < new Date() ? new Error('You cannot post an event in the past.') : null)

		return (
			<View>
				<View style={styles.container}>
					<Input ref="input" type="time" style={styles.time} defaultValue={timeString} onBlur={this.reformatTime.bind(this)} onChange={this.changeTime.bind(this)} />
					<Input type="select" ref="day" style={styles.day} value={day} onChange={this.changeDay.bind(this)}>
						<option value="today">Today</option>
						<option value="tomorrow">Tomorrow</option>
					</Input>
				</View>
				<Text style={styles.text}>
					{error && <Text style={styles.error}>Error! {error.message}</Text>}
				</Text>
				<Input name="time" value={this.state.time.toJSON()} type="hidden" />
			</View>
		)
	}
}

module.exports = LocationInput