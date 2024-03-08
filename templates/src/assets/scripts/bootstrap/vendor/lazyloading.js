// import 'Models/utils/lazyloading';

// use the code above instead of the below if no webp support is needed
import LazyLoading from 'Models/utils/lazyloading-webp';
import { listen } from 'Models/utils/event-bus';

listen('domready', () => {
	LazyLoading.init();
});
