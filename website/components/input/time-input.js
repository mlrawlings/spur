var React = require('react')
  , Input = require('../core/input')
  , View = require('../core/view')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')

var styles = {}

styles.container = {
	flexDirection:'row'
}

styles.time = {

}

styles.timeWithError = {
	...styles.time,
	borderColor:'#c00'
}

styles.day = {
	borderLeftWidth:0
}

styles.dayWithError = {
	...styles.day,
	borderColor:'#c00'
}

styles.text = {
	fontSize:13
}

styles.error = {
	color:'#c00',
	fontSize:12,
	fontWeight:600
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
			
			this.noTimeInputSupport = input.type != 'time'
		} catch(e) {
			this.noTimeInputSupport = __BROWSER__
		}
	}
	reformatTime(e) {
		if(this.noTimeInputSupport && !this.state.error)
			e.target.value = timeUtil.format(this.state.time)
	}
	changeTime(e) {
		try {
			var time = timeUtil.parseTime(e.target.value, this.state.time)
			  , isPast = time < new Date()

			this.setState({ time, isPast, badFormat:null })
			React.findDOMNode(this.refs.time).setCustomValidity(isPast ? 'The start time cannot be in the past.' : '')
		} catch(e) {
			this.setState({ badFormat:e, isPast:false })
			React.findDOMNode(this.refs.time).setCustomValidity(e.message)
		}
	}
	changeDay(e) {
		var time = this.state.time
		  , isPast

		if(e.target.value == 'tomorrow')
			time.setDate(time.getDate() + 1)

		if(e.target.value == 'today')
			time.setDate(time.getDate() - 1)

		isPast = time < new Date()
		this.setState({ time, isPast })
		React.findDOMNode(this.refs.time).setCustomValidity(isPast ? 'The start time cannot be in the past.' : '')
	}
	render() {
		var hours = this.state.time.getHours()
		  , minutes = this.state.time.getMinutes()
		  , day = this.state.time.getDate() == new Date().getDate() ? 'today' : 'tomorrow'

		if(hours <= 9) hours = '0' + hours
		if(minutes <= 9) minutes = '0' + minutes

		var time = hours + ':' + minutes
		  , timeString = this.noTimeInputSupport ? timeUtil.format(this.state.time) : time 
		  , error = this.state.isPast ? 'The start time cannot be in the past.' : this.state.badFormat && this.state.badFormat.message

		return (
			<View>
				<View style={styles.container}>
					<Input ref="time" type="time" style={error ? styles.timeWithError : styles.time} defaultValue={timeString} onBlur={this.reformatTime.bind(this)} onChange={this.changeTime.bind(this)} onKeyDown={this.props.onKeyDown.bind(this)} />
					<Input type="select" ref="day" style={error ? styles.dayWithError : styles.day} value={day} onChange={this.changeDay.bind(this)}>
						<option value="today">Today</option>
						<option value="tomorrow">Tomorrow</option>
					</Input>
				</View>
				<Text style={styles.text}>
					{error && <Text style={styles.error}>Error! {error}</Text>}
				</Text>
				<Input name="time" value={this.state.time.toJSON()} type="hidden" />
			</View>
		)
	}
}

module.exports = LocationInput