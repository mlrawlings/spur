var React = require('react')
  , Image = require('../common/image')
  , View = require('../common/view')

var styles = {}

class GoogleMapMarker extends React.Component {
	constructor(props) {
		super(props)
	}
	init(props) {
		if(!props.map) return
		if(!props.position) return

		this.marker = new google.maps.Marker({
			map: props.map,
			position: new google.maps.LatLng(props.position[0], props.position[1]),
			title: props.title,
			draggable: props.draggable
		})

		google.maps.event.addListener(this.marker, 'dragstart', () => {
			var pos = this.marker.getPosition()
			this.props.onDragStart && this.props.onDragStart([pos.lat(), pos.lng()])
		})

		google.maps.event.addListener(this.marker, 'drag', () => {
			var pos = this.marker.getPosition()
			this.props.onDrag && this.props.onDrag([pos.lat(), pos.lng()])
		})

		google.maps.event.addListener(this.marker, 'dragend', () => {
			var pos = this.marker.getPosition()
			this.props.onDragEnd && this.props.onDragEnd([pos.lat(), pos.lng()])
		})
	}
	componentDidMount() {
		this.init(this.props)
	}
	componentWillReceiveProps(nextProps) {
		if(!this.marker) {
			return this.init(nextProps)
		}
		if(this.props.position != nextProps.position) {
			this.marker.setPosition(new google.maps.LatLng(nextProps.position[0], nextProps.position[1]))
		}
		if(this.props.title != nextProps.title) {
			this.marker.setTitle(nextProps.title)
		}
		if(this.props.draggable != nextProps.draggable) {
			this.marker.setDraggable(nextProps.draggable)
		}
	}
	render() {
		return <View />
	}
}

module.exports = GoogleMapMarker