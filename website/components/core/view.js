var React = require('react')
  , Touchable = require('./touchable')
  , MediaQuery = require('react-responsive')
  , prefix = require('auto-prefixer')

class View extends React.Component {
	render() {
		var { device } = this.context
		  , { tag, style, query, ...props } = this.props
		  , touchable = this.props.href || this.props.onClick
		  , Tag = tag || (this.props.href ? 'a' : 'div')

		return query ? (
			<MediaQuery component={touchable ? Touchable : Tag} tag={Tag} query={query} values={device} style={prefix(style)} {...props} />
		) : touchable ? (
			<Touchable tag={Tag} style={prefix(style)} {...props} />
		) : (
			<Tag style={prefix(style)} {...props} />
		)
	}
}

View.contextTypes = {
	device:React.PropTypes.object
}

module.exports = View