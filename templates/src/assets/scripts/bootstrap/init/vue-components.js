import * as VueFactory from 'Models/utils/vue-factory';
import * as ComponentParser from 'Models/utils/component-parser';

// Define static components & write them to map
import icon from 'Components/vue/icon';

export const staticComponents = {
	icon,
};

ComponentParser.registerFactory('vue', VueFactory.create);
