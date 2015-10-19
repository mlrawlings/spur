var React = require('react')
  , EventItem = require('./event-item')
  , Section = require('../layout/section')
  , Heading = require('../layout/heading')
  , Link = require('../core/link')
  , Text = require('../core/text')
  , View = require('../core/view')
  , Button = require('../core/button')
  , time = require('../../util/time')

var styles = {}

styles.options = {
	flexDirection:'row',
	alignItems:'flex-end',
	justifyContent:'flex-end'
}

styles.cancel = {
	backgroundColor: '#c00',
	marginLeft:5
}

class EventOptions extends React.Component {
	render() {
		return (
			<View style={styles.options}>
				<Button style={styles.cancel} src="/images/down.png"></Button>
				<View style={styles.options}>
					{this.props.isOwner && <Link src="/images/cancel.png" href={'/event/'+this.props.event.id+'/cancel'}>
						Cancel
					</Link>}
					{this.props.canEdit && <Link src="/images/cancel.png" href={'/event/'+this.props.event.id+'/edit'}>
						Edit
					</Link>}
				</View>
			</View>
		)
	}
}

module.exports = EventOptions