document.addEventListener('DOMContentLoaded', function () {
	const containers = document.querySelectorAll('.review-director')
	containers.forEach(setupReviewDirector)
})

/**
 * @param {HTMLElement} container
 */
function setupReviewDirector(container) {
	const maxRatingRedirectURL = container.dataset.maxRatingRedirectUrl
	const starsContainer = container.querySelector('.review-director-stars')
	const stars = starsContainer.querySelectorAll('button')

	/** @type {HTMLInputElement} */
	const ratingInput = container.querySelector('.review-director-rating-input')

	stars.forEach((star, index) => {
		star.addEventListener('click', function () {
			ratingInput.value = this.title

			for (const star of stars) {
				const icon = star.querySelector('i')
				icon.classList.remove('fa-solid')
				icon.classList.add('fa-regular')
			}

			for (let i = 0; i <= index; i++) {
				const icon = stars[i].querySelector('i')
				icon.classList.add('fa-solid')
				icon.classList.remove('fa-regular')
			}

			if (maxRatingRedirectURL && index + 1 === stars.length) {
				window.open(maxRatingRedirectURL, '_blank', 'noopener noreferrer')
			}
		})
	})
}
