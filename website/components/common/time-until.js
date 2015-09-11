var React = require('react')
  , Text = require('./text')
  , timeUtil = require('../../util/time')


class TimeUntil extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time:timeUtil.getRelativeTimeString(props.time)
		}
	}
	componentDidMount() {
		this.liveUpdate()
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			time:timeUtil.getRelativeTimeString(nextProps.time)
		})
	}
	liveUpdate() {
		this.timeout = setTimeout(() => {
			this.setState({
				time:timeUtil.getRelativeTimeString(this.props.time)
			})
			this.liveUpdate()
		}, timeUtil.getMsUntilNextMinute())
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	render() {
		var { time, ...props } = this.props

		return (
			<Text {...this.props}>
				{this.state.time}
			</Text>
		)
	}
}

module.exports = TimeUntil