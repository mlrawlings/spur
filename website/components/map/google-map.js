var React = require('react/addons')
  , Marker = require('./google-map-marker')
  , Image = require('../core/image')
  , View = require('../core/view')

var styles = {}

styles.googleMap = {
	height: 200,
	width: '100%'
}

styles.map = {
	position:'absolute',
	top:0,
	left:0,
	width:'100%',
	height:'100%'
}

class GoogleMap extends React.Component {
	constructor(props) {
		super(props)
	}
	init(props) {
		if(!props.center) return

		var mapNode = React.findDOMNode(this.refs.map)
		
		this.map = new google.maps.Map(mapNode, {
			zoom: props.zoom,
			streetViewControl: false,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP] 
			},
			center: new google.maps.LatLng(props.center[0], props.center[1]),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		})

		if(this.props.stylers) {
			this.map.setOptions({ styles:this.props.stylers })
		}

		this.forceUpdate()
	}
	componentDidMount() {
		this.init(this.props)
	}
	componentWillReceiveProps(nextProps) {
		if(!this.map) {
			return this.init(nextProps)
		}
		if(this.props.center != nextProps.center) {
			this.map.panTo(new google.maps.LatLng(nextProps.center[0], nextProps.center[1]))
		}
		if(this.props.zoom != nextProps.zoom) {
			this.map.setZoom(nextProps.zoom)
		}
		if(this.props.stylers != nextProps.stylers) {
			this.map.setOptions({ styles:nextProps.stylers })
		}
	}
	renderChildren() {
		return React.Children.map(this.props.children, (child) => {
			if(child.type != Marker) return child
				
			return React.addons.cloneWithProps(child, {
				map: this.map
			})
		})
	}
	render() {
		return (
			<View style={{ ...styles.googleMap, ...this.props.style }}>
				<View ref="map" style={styles.map} />
				{this.renderChildren()}
			</View>
		)
	}
}

module.exports = GoogleMap