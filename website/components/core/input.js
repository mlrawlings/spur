var React = require('react')

var styles = {}

styles.input = {
	padding:10,
	borderWidth:1,
	borderStyle:'solid',
	borderColor:'#ccc'
}

class Input extends React.Component {
	render() {
		var { style, type, ...props } = this.props
		
		if(type == 'textarea')
			return <textarea {...props} style={{ ...styles.input, ...style }} />
		
		if(type == 'select')
			return <select {...props} style={{ ...styles.input, ...style }} />
		
		if(type == 'hidden')
			return <input type={type} {...props} />

		return <input type={type} {...props} style={{ ...styles.input, ...style }} />
	}
}

module.exports = Input
module.exports.style = styles.input