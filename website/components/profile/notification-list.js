var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Notification = require('./notification')

var styles = {}

styles.heading = {
	fontSize: 20
}

class NotificationList extends React.Component {
	render() {
		var { user } = this.props
		
		return (
			<Section>
				<View style={styles.heading}>Notifications</View>
				{user.notifications.map((notification) => {
					return <Notification notification={notification} />
				})}
			</Section>
		)
	}
}

NotificationList.contextTypes = {
	user:React.PropTypes.object
}

module.exports = NotificationList
