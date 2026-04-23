document.addEventListener('DOMContentLoaded', setupCaptcha)
function setupCaptcha() {
	/** @type {NodeListOf<HTMLButtonElement>} */
	const refreshButtons = document.querySelectorAll('.captcha-refresh-btn')

	for (const button of refreshButtons)
		button.addEventListener('click', setupCaptchaImages)
	setupCaptchaImages()
}

function setupCaptchaImages() {
	/** @type {NodeListOf<HTMLImageElement>} */
	const captchaImages = document.querySelectorAll('.captcha-image')
	const timestamp = Date.now()

	for (const image of captchaImages) {        
		const src = image.hasAttribute('src') ? image.getAttribute('src') : image.dataset.src ?? 'captcha.php'
		image.src = `${src}?r=${timestamp}`
		image.addEventListener('load', onImageLoad, {
			once: true,
		})
	}
}

/** @param {Event} event */
function onImageLoad(event) {
	if (event.target instanceof HTMLImageElement) {
		event.target.parentElement.dataset.captchaLoaded = 'true'
	}
}
