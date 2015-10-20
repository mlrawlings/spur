var React = require('react')
  , Touchable = require('./touchable')
  , prefix = require('auto-prefixer')

class View extends React.Component {
	render() {
		if(this.props.href) return <Touchable tag="a" {...this.props} />
		if(this.props.onClick) return <Touchable tag="div" {...this.props} />

		var { tag, style, ...props } = this.props
		  , Tag = tag || 'div'

		return <Tag style={prefix(style)} {...props} />
	}
}

module.exports = View