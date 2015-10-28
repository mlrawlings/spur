var React = require('react')
  , View = require('../core/view')
  , Text = require('../core/text')
  , timeUtil = require('../../util/time')

class TimeRange extends React.Component {
	render() {
		var { timezoneOffset } = this.context
		  , { startTime, endTime, style, styleEnd, ...props } = this.props
		  , startTimeClass = timeUtil.getTimeClass(startTime, timezoneOffset)
		  , endTimeClass = endTime && timeUtil.getTimeClass(endTime, timezoneOffset)
		  , sameTimeClassEndTime = endTime && (startTimeClass == endTimeClass ? (' - '+timeUtil.format(endTime, timezoneOffset)) : '') || ''
		  , diffTimeClassEndTime = endTime && (startTimeClass == endTimeClass ? '' : (timeUtil.format(endTime, timezoneOffset) + ' ' + endTimeClass)) || ''

		return (
			<View {...props}>
				<Text style={style}>
					{timeUtil.format(startTime, timezoneOffset) + sameTimeClassEndTime + ' ' + startTimeClass}
				</Text>
				{diffTimeClassEndTime && <Text style={{ ...style, ...styleEnd }}>
					{'until ' + diffTimeClassEndTime}
				</Text>}
			</View>
		)
	}
}

TimeRange.contextTypes = {
	timezoneOffset:React.PropTypes.number
}

module.exports = TimeRange