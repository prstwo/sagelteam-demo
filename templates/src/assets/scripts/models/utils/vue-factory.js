import { createApp, defineAsyncComponent } from 'vue';
import { staticComponents } from 'Bootstrap/init/vue-components';
import { addVueParserMixin } from 'Bootstrap/utils/parser';
import store from 'Store';
import { isDevelopment } from 'Models/utils/environment';

/**
 * @param {Element} element
 */
function checkForSubcomponents (element) {
	const subcomponents = element.querySelectorAll('[data-component]');

	if (!subcomponents.length) {
		return;
	}

	let hasVueSubcomponents = false;

	subcomponents.forEach(subcomponent => {
		const componentData = subcomponent.getAttribute('data-component');
		let config = false;
		if (componentData) {
			config = JSON.parse(componentData);
		}

		if (config.factory === 'vue') {
			hasVueSubcomponents = true;
		}
	});

	if (hasVueSubcomponents) {
		throw new Error('Component has subcomponents: ' + element.tagName);
	}
}

export function create (element, config) {
	const isDev = isDevelopment();
	const componentName = element.tagName.toLowerCase();

	if (isDev) {
		try {
			checkForSubcomponents(element);
		} catch (e) {
			console.error(e);
		}
	}
	console.log(config);

	// wrap component in div to be used for mounting
	const parent = document.createElement('div');
	element.parentNode.insertBefore(parent, element);
	parent.appendChild(element);

	// eslint-disable-next-line no-new
	const app = createApp({});
	addComponents(app, componentName);
	addVueParserMixin(app);
	app.use(store);
	app.mount(parent);
}

function addComponents (app, componentName) {
	for (const key in staticComponents) {
		app.component(key, staticComponents[key]);
	}
	if (!Object.keys(staticComponents).includes(componentName)) {
		// eslint-disable-next-line
		const asyncComp = defineAsyncComponent(() => import(/* webpackChunkName: "[request]" */ 'Components/vue/' + componentName))
		app.component(componentName, asyncComp);
	}
}
