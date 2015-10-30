var React = require('react')
  , Layout = require('../layout')
  , Section = require('../layout/section')
  , Avatar = require('../core/avatar')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , View = require('../core/view')
  , Notification = require('./notification')
  , FullScreenHeader = require('../core/full-screen-header')

var styles = {}

styles.heading = {
	fontSize: 20
}

styles.viewAll = {
	color: '#777'
}

styles.containerExpanded = {
	position:'fixed',
	top:0, left:0, right:0, bottom:0,
	width:'100%',
	height:'100%',
	backgroundColor:'#eaeaea',
	zIndex:10
}

styles.header = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	paddingBottom: 0,
	marginBottom: -30,
	zIndex: 1
}

class NotificationList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			expanded: false
		}
	}
	expand(e) {
		this.setState({ expanded:true })
		this.previousHash = window.location.hash
		this.onHashChange = () => {
		  	if(window.location.hash == this.previousHash) {
				this.collapse()
			}
		}
		window.location.hash = 'notifications'
		window.addEventListener('hashchange', this.onHashChange)
	}
	collapse() {
		this.setState({ expanded:false })
		window.removeEventListener('hashchange', this.onHashChange)
	}
	render() {
		var { user } = this.props
		  , { expanded } = this.state
		  , notifications = expanded ? user.notifications : user.notifications.slice(0, 3)
		
		return (
			<View style={expanded ? styles.containerExpanded : {}}>
				{expanded ? (
					<FullScreenHeader onClick={this.collapse.bind(this)}>
						Notifications
					</FullScreenHeader>
				) : (
					<Section style={styles.header}>
						<View style={styles.heading}>Notifications</View>
						<Text style={styles.viewAll} onClick={this.expand.bind(this)}>View All</Text>
					</Section>
				)}
				<Section>
					{notifications.map((notification) => {
						return <Notification notification={notification} />
					})}
				</Section>
			</View>
		)
	}
}

NotificationList.contextTypes = {
	user:React.PropTypes.object
}

module.exports = NotificationList
