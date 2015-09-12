var React = require('react')

var styles = {}

styles.pressed = {
	opacity:0.8
}

class Link extends React.Component {
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
		  , linkStyle = this.state.pressed ? { ...style, ...styles.pressed } : style
		  , press = this.press.bind(this)
		  , release = this.release.bind(this)

		return <a {...props} style={linkStyle} onMouseDown={press} onMouseUp={release} onMouseLeave={release} />
	}
}

module.exports = Link