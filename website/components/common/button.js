var React = require('react')
  , Image = require('./image')
  , Text = require('./text')

var styles = {}

styles.normal = {
	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 14,
	textAlign: 'center',
	color:'#fff',

	padding:8,
	paddingBottom:5,
	borderWidth: 0,
	borderBottomWidth: 3,
	borderRadius: 4,

	backgroundColor: '#04beca',
	borderBottomColor:'rgba(0,0,0,0.2)',

	flexDirection:'row',

	textDecoration: 'none',
	cursor:'pointer'
}

styles.pressed = {
	top:2,
	paddingBottom: 8,
	borderBottomWidth: 0,
	outline:'none'
}

styles.image = {
	width:20,
	height:20
}

styles.text = {
	flex:1,
	paddingLeft:6,
	paddingRight:6
}

styles.textWithIcon = {
	flex:1,
	paddingLeft:6,
	paddingRight:6,
	marginLeft:8
}

styles.overlay = {
	backgroundColor:'rgba(0,0,0,0.2)',
	position:'absolute',
	top:0,
	right:0,
	left:0,
	bottom:0,
	borderRadius:4,
	pointerEvents:'none'
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
		var { style, src, children, ...props } = this.props
		  , buttonStyle = { ...styles.normal, ...style }
		  , press = this.press.bind(this)
		  , release = this.release.bind(this)
		  , Tag = this.props.href ? 'a' : 'button'

		if(this.state.pressed) {
			buttonStyle = { ...buttonStyle, ...styles.pressed }
		}

		if(this.state.pressed) {
			//props.children = [props.children, <div style={styles.overlay} />]
		}

		return (
			<Tag style={buttonStyle} {...props} onMouseDown={press} onMouseUp={release} onMouseLeave={release}>
				{src && <Image style={styles.image} src={src} />}
				{children && <Text style={src ? styles.textWithIcon : styles.text}>{children}</Text>}
			</Tag>
		)
	}
}

module.exports = Button