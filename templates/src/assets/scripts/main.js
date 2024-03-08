import domready from 'domready';
import { init } from 'Models/utils/app';
import { dispatch } from 'Models/utils/event-bus';
import 'Bootstrap';

domready(() => {
	dispatch('domready');
	init();
});
