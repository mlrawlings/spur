var React = require('react')
  , View = require('./view')
  , Text = require('./text')
  , MediaQuery = require('react-responsive')

var styles = {}

styles.overlay = {
	backgroundColor:'rgba(0,0,0,0.5)',
	position:'fixed',
	top:0, left:0, right:0, bottom:0,
	justifyContent:'center',
	alignItems:'center',
	zIndex:10
}

styles.overlayActive = {
	opacity:1,
	backgroundColor:'rgba(0,0,0,0.25)',
}

styles.modal = {
	backgroundColor:'#fff',
	overflow:'auto',
	maxWidth:'95%',
	maxHeight:'95%',
	marginTop:'-5%',
	width:450,
	boxShadow:'0 2px 5px rgba(0,0,0,0.3)',
	borderRadius:4
}

styles.modalDocked = {
	backgroundColor:'#fff',
	overflow:'auto',
	width:'100%',
	position:'fixed',
	left:0, bottom:0,
	boxShadow:'0 -2px 5px rgba(0,0,0,0.3)',
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
	componentDidMount() {
		this.toggleBodyScroll(this.props.isOpen)
	}
	componentWillReceiveProps(nextProps) {
		this.toggleBodyScroll(nextProps.isOpen)
	}
	toggleBodyScroll(isOpen) {
		if(isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
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
		var { style, isOpen, ...props } = this.props
		return !!this.props.isOpen && (
			<View style={styles.overlay} styleActive={styles.overlayActive} onClick={this.overlayClose.bind(this)}>
				<MediaQuery query="(max-width:500px) and (max-height:750px), (max-height:500px) and (max-width:750px)">
					<View style={{ ...styles.modalDocked, ...style }} {...props} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation} />
				</MediaQuery>
				<MediaQuery query="(min-width:501px) and (min-height:501px), (min-width:751px), (min-height:751px)" >
					<View style={{ ...styles.modal, ...style }} {...props} onMouseDown={this.stopPropagation} onTouchStart={this.stopPropagation} />
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