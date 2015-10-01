var React = require('react')
  , Touchable = require('./touchable')
  , Image = require('./image')
  , Text = require('./text')
  , View = require('./view')
  , Color = require('color')

var styles = {}

styles.normal = {
	fontFamily: 'Open Sans, sans-serif',
	fontWeight: 600,
	fontSize: 14,
	textAlign: 'center',

	padding:8,
	paddingBottom:5,
	borderWidth: 0,
	borderBottomWidth: 3,
	borderRadius: 4,

	backgroundColor: '#04beca',
	borderBottomColor:'rgba(0,0,0,0.2)',

	textDecoration: 'none',
	cursor:'pointer'
}

styles.wrapper = {
	flexDirection:'row',
	alignItems:'center',
	flexGrow:1
}

styles.active = {
	top:2,
	paddingBottom: 8,
	borderBottomWidth: 0,
	outline:'none'
}

styles.image = {
	width:20,
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

styles.loadingContainerLeft = {
	...styles.loadingContainer,
	alignItems:'flex-start'
}

styles.text = {
	paddingLeft:6,
	paddingRight:6,
	color:'#fff'
}

styles.textWithIcon = {
	...styles.text,
	marginLeft:8,
}

class Button extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}
	onClick(e) {
		if(this.props.onClick)
			this.props.onClick(e)

		if(!e.defaultPrevented && this.props.href) {
			e.preventDefault()
			app.navigate(this.props.href).then(() => {
				this.setState({ loading:false })
			})

			this.setState({ loading:true })
		}
	}
	render() {
		var { style, styleActive, src, children, onClick, ...props } = this.props
		  , tag = this.props.href ? 'a' : 'button'
		  , loading = this.state.loading || this.props.loading
		  , textColor = Color(style && style.color || styles.text.color)
		  , imageStyles = loading ? { ...styles.image, opacity:0 } : styles.image
		  , textStyles = src ? styles.textWithIcon : loading ? { ...styles.text, opacity:0 } : styles.text

		textStyles = { ...textStyles, color:textColor.hexString() }
		  
		return (
			<Touchable tag={tag} {...props} onClick={this.onClick.bind(this)} style={{ ...styles.normal, ...style}} styleActive={{ ...styles.active, ...styleActive}}>
				<View style={styles.wrapper}>
					{src && <Image ref="image" style={imageStyles} src={src} />}
					{children && <Text style={textStyles}>{children}</Text>}
					{loading && <View style={src ? styles.loadingContainerLeft : styles.loadingContainer}>
						<Image style={styles.image} src={textColor.luminosity() > 0.8 ? "/images/white-tail-spin.svg" : "/images/black-tail-spin.svg"} />
					</View>}
				</View>
			</Touchable>
		)
	}
}

module.exports = Button