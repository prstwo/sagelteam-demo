import { listen } from 'Models/utils/event-bus';

export function initWindowHeightWatching () {
	setWindowHeight();
	listen('window-resized', () => {
		setWindowHeight();
	});
}

function setWindowHeight () {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
