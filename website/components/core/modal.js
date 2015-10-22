const ARROW_SIZE = 8

var React = require('react')
  , View = require('./view')
  , Text = require('./text')
  , MediaQuery = require('react-responsive')

var styles = {}

styles.overlay = {
	backgroundColor:'rgba(0,0,0,0.3)',
	position:'fixed',
	top:0, left:0, right:0, bottom:0,
	zIndex:10
}

styles.overlayActive = {
	opacity:1
}

styles.modal = {
	backgroundColor:'#fff',
	overflow:'auto',
	maxWidth:'95%',
	maxHeight:'95%',
	width:400,
	boxShadow:'0 0 15px rgba(0,0,0,0.3)',
	borderRadius:4,
	position:'fixed'
}

styles.modalDocked = {
	backgroundColor:'#fff',
	overflow:'auto',
	width:'100%',
	position:'fixed',
	left:0, bottom:0,
	boxShadow:'0 -2px 5px rgba(0,0,0,0.3)',
}

styles.arrowBase = {
	borderWidth:ARROW_SIZE,
	borderColor:'transparent',
	position:'fixed',
	zIndex:2
}

styles.arrow = {
	up: {
		...styles.arrowBase,
		borderBottomColor:'#fff'
	},
	down: {
		...styles.arrowBase,
		borderTopColor:'#fff'
	},
	left: {
		...styles.arrowBase,
		borderRightColor:'#fff'
	},
	right: {
		...styles.arrowBase,
		borderLeftColor:'#fff'
	}
}

styles.header = {
	backgroundColor:'#444',
	paddingLeft:20,
	paddingRight:20,
	paddingTop:10,
	paddingBottom:10,
	flexDirection:'row',
	justifyContent:'space-between'
}

styles.body = {
	padding:20,
}

styles.title = {
	color:'#fff',
	fontSize:24,
	fontWeight:300
}

class Modal extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			modalPosition:{ top:0, left:0 },
			arrowPosition:{ top:0, left:0 },
			arrowDirection:'up'
		}
	}
	componentDidMount() {
		this.toggleBodyScroll(this.props.openedBy)
		this.calculatePosition(this.props.openedBy)

	}
	componentWillReceiveProps(nextProps) {
		this.toggleBodyScroll(nextProps.openedBy)
		this.calculatePosition(nextProps.openedBy)
	}
	calculatePosition(openedBy) {
		if(!openedBy) return

		var opener = React.findDOMNode(openedBy)
		  , rect = opener.getBoundingClientRect()
		  , top = rect.top
		  , bottom = window.innerHeight - rect.bottom
		  , left = rect.left
		  , right = window.innerWidth - rect.right
		  , modalPosition = {}
		  , arrowPosition = {}
		  , arrowDirection
		
		if(top > bottom) {
			arrowPosition.bottom = window.innerHeight - rect.top
			modalPosition.bottom = window.innerHeight - rect.top + ARROW_SIZE*2
			arrowDirection = 'down'
		} else {
			arrowPosition.top = rect.bottom
			modalPosition.top = rect.bottom + ARROW_SIZE*2
			arrowDirection = 'up'
		}

		if(left > right) {
			modalPosition.right = window.innerWidth - rect.right
			if(modalPosition.right + 400 > window.innerWidth - 20) {
				modalPosition.right = window.innerWidth - 20 - 400
			}
		} else {
			modalPosition.left = rect.left
			if(modalPosition.left + 400 > window.innerWidth - 20) {
				modalPosition.left = window.innerWidth - 20 - 400
			}
		}

		arrowPosition.left = (rect.left + rect.right)/2 - ARROW_SIZE

		this.setState({ modalPosition, arrowPosition, arrowDirection })
	}
	toggleBodyScroll(openedBy) {
		if(openedBy) {
			document.body.style.overflow = 'hidden'
			// document.documentElement.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
			// document.documentElement.style.overflow = ''
		}
	}
	stopPropagation(e) {
		e.stopPropagation()
	}
	overlayClose(e) {
		if(e.target == e.currentTarget) {
			this.props.onRequestClose && this.props.onRequestClose()
		}
	}
	render() {
		var { style, openedBy, ...props } = this.props
		  , { modalPosition, arrowPosition, arrowDirection } = this.state

		return !!openedBy && (
			<View style={styles.overlay} styleActive={styles.overlayActive} onClick={this.overlayClose.bind(this)} onTouchStart={this.stopPropagation}>
				<MediaQuery query="(max-width:500px) and (max-height:750px), (max-height:500px) and (max-width:750px)">
					<View style={{ ...styles.modalDocked, ...style }} {...props} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation} />
				</MediaQuery>
				<MediaQuery query="(min-width:501px) and (min-height:501px), (min-width:751px), (min-height:751px)" >
					<View style={{ ...styles.arrow[arrowDirection], ...arrowPosition }} />
					<View style={{ ...styles.modal, ...modalPosition, ...style }} {...props} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation} />
				</MediaQuery>
			</View>
		)
	}
}

class ModalHeader extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <View style={{ ...styles.header, ...style }} {...props} />
	}
}

class ModalBody extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <View style={{ ...styles.body, ...style }} {...props} />
	}
}

class ModalTitle extends React.Component {
	render() {
		var { style, ...props } = this.props
		return <Text style={{ ...styles.title, ...style }} {...props} />
	}
}

module.exports = Modal
module.exports.Header = ModalHeader
module.exports.Body = ModalBody
module.exports.Title = ModalTitle