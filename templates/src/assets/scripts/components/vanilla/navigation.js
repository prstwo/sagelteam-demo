import { lockPage, unlockPage } from 'Models/locker';

export default element => {
	const elements = {
		mobileToggle: element.querySelector('.js-navigation__mobile-toggle'),
	};

	const states = {
		mobileNavOpen: 'is-mobile-navigation-open',
	};

	function init () {
		addListeners();
	}

	function addListeners () {
		elements.mobileToggle.addEventListener('click', mobileToggleClickHandler);
	}

	function mobileToggleClickHandler () {
		element.classList.toggle(states.mobileNavOpen);

		if (element.classList.contains(states.mobileNavOpen)) {
			lockPage();
		} else {
			unlockPage();
		}
	}

	init();
};
