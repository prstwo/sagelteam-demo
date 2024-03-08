export const attributeChangeListener = (element, attributeFilter, callback) => {
	const observer = new MutationObserver(callback); // has an array mutationsList as first parameter
	observer.observe(element, { attributes: true, attributeFilter });
};

export const classChangeListener = (element, callback) => attributeChangeListener(element, ['class'], callback);
