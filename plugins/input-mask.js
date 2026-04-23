/**
 * Documentation
 *
 * Add this script tag to the website:
 *
 * ```html
 * <script type="module" src="./path/to/input-mask.js"></script>
 * ```
 * !!! The `type="module"` attribute is required.
 *
 * Add the `data-imask` attribute to the input element:
 *
 * ```html
 * <input type="text" data-imask="000-000-0000" />
 * ```
 * !!! The `type="text"` attribute is required. IMask does not support other input types.
 *
 * The `data-imask` attribute value is the mask.
 * It can be any mask supported by the [imaskjs](https://imask.js.org/guide.html) library.
 *
 * Basic mask options:
 * `0` - any digit
 * `a` - any letter
 * `*` - any character
 *
 * Mask examples:
 * `000-000-0000` - phone number
 * `0000-0000-0000-0000` - credit card number
 * `00/00/0000` - date
 */
import 'https://unpkg.com/imask'

document.addEventListener('DOMContentLoaded', setupMaskedInputs)
function setupMaskedInputs() {
	/** @type {NodeListOf<HTMLInputElement>} */
	const inputs = document.querySelectorAll('input[data-imask]')

	for (const input of inputs) {
		let mask = input.dataset.imask

		const options = input.dataset.imaskOptions
			? JSON.parse(input.dataset.imaskOptions)
			: {}
		options.mask = mask

		// @ts-ignore
		IMask(input, options)
	}
}
