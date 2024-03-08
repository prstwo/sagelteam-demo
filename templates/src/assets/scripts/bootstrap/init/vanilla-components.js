import * as ComponentParser from 'Models/utils/component-parser';
import * as VanillaFactory from 'Models/utils/vanilla-factory';

// Define async components
const asyncComponents = [
	'navigation',
];

// Register async components
asyncComponents.forEach(asyncComponent => {
	VanillaFactory.registerComponent(asyncComponent, () => import(/* webpackChunkName: "[request]" */ 'Components/vanilla/' + asyncComponent));
});

ComponentParser.registerFactory('vanilla', VanillaFactory.create);
