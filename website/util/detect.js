var hasMouse = false

__BROWSER__ && (function() {
	var touched = false

	var mouse = () => {
		if(!touched) hasMouse = true
		document.removeEventListener('mousemove', mouse)
	}

	var touch = () => {
		touched = true
		document.removeEventListener('touchstart', touch)
	}

	document.addEventListener('touchstart', touch)
	document.addEventListener('mousemove', mouse)
}())

exports.hasMouse = () => hasMouse	