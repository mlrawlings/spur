var React = require('react')

var styles = {}

styles.normal = {
	display:'flex',

	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 16,
	textAlign: 'center',
	color:'#fff',

	padding:8,
	paddingBottom:5,
	borderWidth: 0,
	borderBottomWidth: 3,
	borderRadius: 4,

	background: '#04beca',
	borderBottomColor:'rgba(0,0,0,0.2)',

	textDecoration: 'none',
	cursor:'pointer'
}

styles.pressed = {
	top:2,
	paddingBottom: 8,
	borderBottomWidth: 0,
	outline:'none'
}

styles.overlay = {
	backgroundColor:'rgba(0,0,0,0.2)',
	position:'absolute',
	top:0,
	right:0,
	left:0,
	bottom:0,
	borderRadius:4
}

class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pressed:false }
	}
	press() {
		this.setState({ pressed:true })
	}
	release() {
		this.setState({ pressed:false })
	}
	render() {
		var { style, ...props } = this.props
		  , buttonStyle = { ...styles.normal, ...style }
		  , press = this.press.bind(this)
		  , release = this.release.bind(this)

		if(this.state.pressed) {
			buttonStyle = { ...buttonStyle, ...styles.pressed }
		}

		if(this.state.pressed) {
			props.children = [props.children, <div style={styles.overlay} />]
		}

		if(this.props.href)
			return <a style={buttonStyle} {...props} onMouseDown={press} onMouseUp={release} onMouseLeave={release} />
		else
			return <button style={buttonStyle} {...props} onMouseDown={press} onMouseUp={release} onMouseLeave={release} />
	}
}

module.exports = Button