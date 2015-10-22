var React = require('react')
  , View = require('../core/view')
  , Text = require('../core/text')
  , Link = require('../core/link')
  , Modal = require('../core/modal')
  , Label = require('../layout/label')
  , Input = require('../core/input')
  , Separator = require('../core/separator')
  , FacebookSendButton = require('../button/facebook-send-button')
  , FacebookShareButton = require('../button/facebook-share-button')
  , TextMessageButton = require('../button/text-message-button')

var styles = {}

styles.copy = {
	...Input.style,
	padding:0,
	flexDirection:'row'
}

styles.copyInput = {
	border:0,
	flexGrow:1,
	cursor:'text'
}

styles.copyButton = {
	backgroundColor:'#04beca',
	color:'#fff',
	justifyContent:'center',
	alignItems:'center',
	padding:10,
	fontWeight:600,
	fontSize:14,
	cursor:'pointer'
}

styles.social = {
	flexDirection:'row',
	justifyContent:'center'
}

styles.socialButton = {
	marginLeft:5,
	marginRight:5
}

class DownloadAndShare extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			url:__BROWSER__ && window.location.href,
			noSupport:false,
			copied:false
		}
	}
	copyText(e) {
		try {
			var input = React.findDOMNode(this.refs.input)

			window.getSelection().removeAllRanges()
			input.select()
			if(document.queryCommandEnabled('copy')) {
				document.execCommand('copy')
				this.setState({ copied:true })
				setTimeout(() => this.setState({ copied:false }), 2000)
			}
		} catch(e) {
			React.findDOMNode(this.refs.input).select()
		}
	}
	render() {
		var { url, noSupport, copied } = this.state

		return (
			<Modal {...this.props}>
				<Modal.Body>
					<Label required={true}>Share this link...</Label>
					<View style={styles.copy}>
						<Input style={styles.copyInput} ref="input" type="text" value={url} readOnly={true} />
						<Link style={styles.copyButton} onClick={this.copyText.bind(this)}>{copied ? 'Copied!' : 'Copy Link'}</Link>
					</View>
					<Separator>or share with</Separator>
					<View style={styles.social}>
						<FacebookShareButton style={styles.socialButton} currentURL={url} />
						<FacebookSendButton style={styles.socialButton} currentURL={url} />
						<TextMessageButton style={styles.socialButton} currentURL={url} />
					</View>
				</Modal.Body>
			</Modal>
		)
	}
}

module.exports = DownloadAndShare