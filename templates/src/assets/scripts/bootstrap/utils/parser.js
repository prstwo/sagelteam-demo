import * as app from 'Models/utils/app';
import * as ComponentParser from 'Models/utils/component-parser';

export function addVueParserMixin (app) {
	app.mixin({
		mounted () {
			if (this.$el.querySelectorAll) {
				// handle vanilla component rendering inside vue component
				ComponentParser.parse(this.$el, false);

				// handle lazyloaded images stuck in lazyloading state
				this.$el.querySelectorAll('.lazyloading').forEach(image => {
					image.classList.remove('lazyloading');
					image.classList.add('lazyload');
				});
			}
		},
	});
}

app.registerParser(ComponentParser.parse);
