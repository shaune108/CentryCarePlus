// Toggle dropdown menu on click
const dropdownToggles = document.querySelectorAll('.dropdown-toggle')

dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
        event.preventDefault() // Prevent default link behavior
        const submenu = toggle.nextElementSibling
        submenu.classList.toggle('show')
        toggle.classList.toggle('active') // Optional: Add/remove active class for visual feedback
    })
})

// Close submenus on any click within menu (except dropdown toggles)
document.addEventListener('click', function (event) {
    const clickedItem = event.target
    const isDropdownToggle =
        clickedItem.classList.contains('dropdown-toggle')
    const isDropdownContent =
        clickedItem.classList.contains('dropdown-content')
    const isClickInsideMenu = document
        .getElementById('main-menu')
        .contains(clickedItem)

    if (!isDropdownToggle && !isDropdownContent && !isClickInsideMenu) {
        const openDropdowns = document.querySelectorAll(
            '.dropdown-content.show'
        )
        openDropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('show')
            dropdown.previousElementSibling.classList.remove('active')
        })
    }
})

// Close submenus on any click within menu (except dropdown toggles)

const nav = document.getElementById('main-nav');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('main-menu');
let menuOpen = false;

window.addEventListener('click', (event) => {
	// close menu if clicking outside of it
	if (!menuOpen || nav.contains(event.target)) return

	menuToggle.setAttribute('aria-expanded', 'false')
	menuToggle.setAttribute('aria-label', 'Open main menu')
	nav.classList.remove('active');
	menuOpen = false;
})

menuToggle.addEventListener('click', function (event) {
	if (menuOpen) {
		menuToggle.setAttribute('aria-expanded', 'false')
		menuToggle.setAttribute('aria-label', 'Open main menu')
		nav.classList.remove('active');
		menuOpen = false;
	} else {
		menuToggle.setAttribute('aria-expanded', 'true')
		menuToggle.setAttribute('aria-label', 'Close main menu')
		nav.classList.add('active');
		menuOpen = true;
	}
})