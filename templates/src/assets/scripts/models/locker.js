const states = {
	isLocked: 'is-locked',
};

const lockElement = document.querySelector('.page');
const documentElement = document.documentElement;

let locked = false;
let scrollPos = {
	x: 0,
	y: 0,
};

export function lockPage () {
	if (locked || !lockElement) {
		return false;
	}
	scrollPos = {
		x: window.scrollX,
		y: window.scrollY,
	};
	locked = true;
	lockElement.style.top = -scrollPos.y + 'px';
	documentElement.classList.add(states.isLocked);
}

export function unlockPage () {
	if (!locked) {
		return false;
	}
	documentElement.classList.remove(states.isLocked);
	// prevent smooth scroll behavior while jumping back
	documentElement.style.scrollBehavior = 'auto';
	window.scrollTo(scrollPos.x, scrollPos.y);
	lockElement.style.top = 'auto';
	locked = false;
	documentElement.style.scrollBehavior = null;
}
