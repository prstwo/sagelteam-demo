import { listen, dispatch } from 'Models/utils/event-bus';

export const breakpoints = {
	zero: 0,
	mobile: 350,
	'mobile-landscape': 480,
	tablet: 760,
	'tablet-landscape': 980,
	desktop: 1180,
	notebook: 1440,
	laptop: 1650,
	page: 1920,
};

export let currentlyActiveBreakpoints = getActiveBreakpoints();

export function initBreakpointWatching () {
	listen('window-resized', () => {
		updateActiveBreakpoints();
	});
}

function getActiveBreakpoints () {
	const activeBreakpoints = [];
	const windowWidth = window.innerWidth;
	for (const [key, value] of Object.entries(breakpoints)) {
		if (value <= windowWidth) {
			activeBreakpoints.push(key);
		} else {
			break;
		}
	}
	return activeBreakpoints;
}

function updateActiveBreakpoints () {
	const newActiveBreakpoints = getActiveBreakpoints();
	if (newActiveBreakpoints.length !== currentlyActiveBreakpoints.length) {
		currentlyActiveBreakpoints = newActiveBreakpoints;
		dispatch('active-breakpoints-change', currentlyActiveBreakpoints);
	}
}
