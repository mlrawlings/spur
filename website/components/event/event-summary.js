var React = require('react')
  , Section = require('../layout/section')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , Image = require('../core/image')
  , timeUtil = require('../../util/time')
  , locationUtil = require('../../util/location')

var styles = {}

styles.summary = {
	backgroundColor:'#f4f4f4',
	borderBottomWidth:1,
	borderBottomColor:'#ddd',
	paddingTop:20,
	paddingBottom:20
}

styles.summaryHorizontal = {
	...styles.summary,
	backgroundColor:'#fff',
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
}

styles.title = {
	fontSize: 28,
	fontWeight: 300
}

styles.time = {
	fontSize: 14,
	color: '#888',
	textTransform:'lowercase'
}

styles.endTime = {
	fontSize: 9,
	color: '#888',
	textTransform:'lowercase'
}

styles.nameAndTime = {
	flex:1,
	minWidth:300
}

styles.location = {
	alignItems:'flex-end',
	textAlign: 'right',
	marginLeft:20,
	paddingTop:10,
	paddingBottom:10
}

styles.locationName = {
	fontWeight:600
}

styles.address = {
	fontSize:14,
}

styles.addressLink = {
	color:'#04beca',
	textDecoration:'underline'
}

styles.distance = {
	fontSize:13,
	color:'#aaa'
}

styles.locationButton = {
	borderWidth:1,
	borderColor:'#ddd',
	backgroundColor:'#fff',
	flexDirection:'row',
	alignItems:'stretch',
	marginTop:10
}

styles.locationButtonMap = {
	flexBasis:100,
	minHeight:100,
	flexShrink:2,
	backgroundColor:'#444',
	backgroundSize:'cover',
	backgroundPosition:'center center'
}

styles.locationButtonAddress = {
	paddingLeft:20,
	paddingRight:20,
	flex:1,
	justifyContent:'center' 
}

class EventSummary extends React.Component {
	renderLocationButton() {
		var { event } = this.props
		return (
			<Link style={styles.locationButton} href={"http://maps.google.com?daddr="+event.location.coords[0]+','+event.location.coords[1]}>
				<View style={{ ...styles.locationButtonMap, backgroundImage:'url(\''+locationUtil.getMapImageUrl(event.location, 150, 150)+'\')' }} />
				<View style={styles.locationButtonAddress}>
					{this.renderLocationText()}
				</View>
			</Link>
		)
	}
	renderLocationText(displayAsLink) {
		var { event, location } = this.props
		return [
			<Text style={styles.locationName}>{event.location.name}</Text>,
			<Text style={displayAsLink ? styles.addressLink : styles.address}>{event.location.street}</Text>,
			<Text style={displayAsLink ? styles.addressLink : styles.address}>{event.location.citystatezip}</Text>,
			<Text style={styles.distance}>{location && locationUtil.getDistanceBetween(event.location.coords, location.coords) + ' away'}</Text>
		]
	}
	renderTitle(isHorizontal) {
		var { event } = this.props
		  , startTimeClass = timeUtil.getTimeClass(event.time)
		  , endTimeClass = event.endTime && timeUtil.getTimeClass(event.endTime)
		  , sameTimeClassEndTime = event.endTime && (startTimeClass == endTimeClass ? (' - '+timeUtil.format(event.endTime)) : '') || ''
		  , diffTimeClassEndTime = event.endTime && (startTimeClass == endTimeClass ? '' : (timeUtil.format(event.endTime) + ' ' + endTimeClass)) || ''
		
		return (
			<View style={styles.nameAndTime}>
				<Text style={styles.title}>
					{event.name}
				</Text>
				<Text>{event.invited}</Text>
				<Text style={styles.time}>
					{timeUtil.format(event.time) + sameTimeClassEndTime + ' ' + startTimeClass}
				</Text>
				{diffTimeClassEndTime && <Text style={styles.endTime}>
					{'until '+diffTimeClassEndTime}
				</Text>}
			</View>
		)
	}
	render() {
		var { event } = this.props
		  , isSmall = '(max-width:500px), (max-height:500px)'
		  , isLarge = '(min-width:501px) and (min-height:501px)'
		return (
			<View>
				<Section style={styles.summary} query={isSmall}>
					{this.renderTitle()}
					{this.renderLocationButton()}
				</Section>
				<Section style={styles.summaryHorizontal} query={isLarge}>
					{this.renderTitle()}
					<View style={styles.location}>
						<Link href={"http://maps.google.com?daddr="+event.location.coords[0]+','+event.location.coords[1]}>
							{this.renderLocationText(true)}
						</Link>
					</View>
				</Section>
			</View>
		)
	}
}

module.exports = EventSummary