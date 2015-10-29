var React = require('react')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')

class Time extends React.Component {
	render() {
		var { timezoneOffset } = this.context
		  , { time, format, ...props } = this.props
		  , content

		if(format == 'full') {
			content = timeUtil.format(time, timezoneOffset) + ' ' + timeUtil.getTimeClass(time, timezoneOffset)
		} else if(format == 'class') {
			content = timeUtil.getTimeClass(time, timezoneOffset)
		} else {
			content = timeUtil.format(time, timezoneOffset)
		}

		return (
			<Text {...props}>{content}</Text>
		)
	}
}

Time.contextTypes = {
	timezoneOffset:React.PropTypes.number
}

module.exports = Time