/** @type {string|null} */
let hash = null

// immediately remove the hash to prevent the page from jumping
if (location.hash) {
	hash = location.hash.replace('#', '')
	window.location.hash = ''
}

document.addEventListener('DOMContentLoaded', async () => {
	setTimeout(async () => {
		if (!hash) return
		await scrollToHighlight(hash)
		history.replaceState(null, '', `#${hash}`)
	}, 250)

	const pageLinks = document.querySelectorAll('a[href^="#"]')
	for (const pageLink of pageLinks) {
		pageLink.addEventListener('click', async e => {
			e.preventDefault()
			let hash = pageLink.getAttribute('href')
			if (!hash) return
			hash = hash.replace('#', '')

			await scrollToHighlight(hash)
			history.replaceState(null, '', `#${hash}`)
		})
	}
})

/**
 * @param {string} hash
 * @returns {Promise<void>}
 */
function scrollToHighlight(hash) {
	const element = document.getElementById(hash)
	if (!element) {
		console.warn(`Element with id '${hash}' not found`)
		return Promise.resolve()
	}

	return new Promise(resolve => {
		let x = element.offsetLeft,
			y = element.offsetTop

		// calculate x,y for the element to be in the center of the screen
		// if taller or wider than the screen, scroll to the top/left of element minus 200px
		if (element.clientWidth > window.innerWidth) x -= 100
		else x -= window.innerWidth / 2 - element.offsetWidth / 2

		if (element.clientHeight > window.innerHeight) y -= 100
		else y -= window.innerHeight / 2 - element.offsetHeight / 2

		// don't scroll to negative values
		if (x < 0) x = 0
		if (y < 0) y = 0

		console.log(x, y)
		window.scrollTo(x, y)

		// give it some time to scroll
		setTimeout(() => {
			element.classList.add('achor-highlight')
			resolve()

			// give it some time to highlight
			setTimeout(() => {
				element.classList.remove('achor-highlight')
			}, 2000)
		}, 100)
	})
}
