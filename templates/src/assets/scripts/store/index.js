import { createStore } from 'vuex';

import * as mutations from 'Store/mutations';
// import * as actions from 'Store/actions';
// import * as getters from 'Store/getters';
// import plugins from 'Store/plugins';
import debounce from 'lodash/debounce';

const debug = process.env.NODE_ENV !== 'production';
const store = createStore({
	state: {
		windowWidth: window.innerWidth,
	},
	mutations,
	// actions,
	// getters,
	// plugins,
	modules: {},
	strict: debug,
});

window.addEventListener(
	'resize',
	debounce(() => {
		store.commit('setWindowWidth', window.innerWidth);
	}, 200),
);

export default store;
