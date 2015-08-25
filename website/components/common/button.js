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
	opacity:0.8,
	paddingBottom: 8,
	borderBottomWidth: 0,
	outline:'none'
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

		if(this.props.href)
			return <a style={buttonStyle} {...props} onMouseDown={press} onMouseUp={release} onMouseLeave={release} />
		else
			return <button style={buttonStyle} {...props} onMouseDown={press} onMouseUp={release} onMouseLeave={release} />
	}
}

module.exports = Button