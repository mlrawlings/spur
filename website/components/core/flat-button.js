var React = require('react')
  , Touchable = require('./touchable')
  , Image = require('./image')
  , Text = require('./text')
  , View = require('./view')
  , Color = require('color')

var styles = {}

styles.button = {
	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 15,
	color:'#fff',
	textAlign: 'center',
	justifyContent:'center',
	alignItems:'center',
	height:55,
	paddingLeft:20,
	paddingRight:20,
	backgroundColor:'#04beca',
	flexDirection:'row'
}

styles.loadingImage = {
	width:'auto',
	height:20
}

styles.loadingContainer = {
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center'
}

styles.text = {
	width:'100%',
	textAlign:'center'
}

class FlatButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	onClick(e) {
		if(this.props.onClick)
			this.props.onClick(e)

		if(!e.defaultPrevented && this.props.href) {
			var navigation = app.navigate(this.props.href)
			if(navigation) {
				navigation.then(() => {
					this.setState({ loading:false })
				})
				e.preventDefault()
				this.setState({ loading:true })
			}
		}
	}
	render() {
		var { style, styleActive, src, children, onClick, ...props } = this.props
		  , tag = this.props.href ? 'a' : 'button'
		  , loading = this.state.loading || this.props.loading
		  , textColor = Color(style && style.color || styles.button.color)
		  , textStyles = loading ? { ...styles.text, opacity:0 } : styles.text

		textStyles = { ...textStyles, color:textColor.hexString() }

		return (
			<Touchable tag={tag} {...props} onClick={this.onClick.bind(this)} style={{ ...styles.button, ...style}}>
				<Text style={textStyles}>{children}</Text>
				{loading && <View style={styles.loadingContainer}>
					<Image style={styles.loadingImage} src={textColor.luminosity() > 0.8 ? "/images/white-tail-spin.svg" : "/images/black-tail-spin.svg"} />
				</View>}
			</Touchable>
		)
	}
}

module.exports = FlatButton
module.exports.style = styles.button