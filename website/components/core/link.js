var React = require('react')
  , Touchable = require('./touchable')

var styles = {}

styles.active = {
	opacity:0.8
}

class Link extends React.Component {
	render() {
		var { style, styleActive, ...props } = this.props

		styleActive = { ...styles.active, ...styleActive }

		return <Touchable tag="a" {...props} style={style} styleActive={styleActive} />
	}
}

module.exports = Link