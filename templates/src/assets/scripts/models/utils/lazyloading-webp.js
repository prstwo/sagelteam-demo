/* global lazySizes */
import 'lazysizes';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/respimg/ls.respimg';
import * as ProjectConfig from 'Models/utils/project-config';
import { breakpoints } from 'Models/breakpoints';

Object.assign(lazySizes.cfg, {
	init: false,
	customMedia: {},
});

for (const breakpoint in breakpoints) {
	lazySizes.cfg.customMedia[`--${breakpoint}`] = `(min-width: ${breakpoints[breakpoint]}px)`;
	lazySizes.cfg.customMedia[`--until-${breakpoint}`] = `(max-width: ${breakpoints[breakpoint]}px)`;
}

let sourceExpression;
let sourceRegularExpression;
const urlHelper = document.createElement('a');
const assetsUrl = ProjectConfig.get('assetsUrl');

const imageTypeRegex = /.jpg|.png|.jpeg/g;

const validImage = url => {
	if (url.indexOf(assetsUrl) >= 0) return true;
	if (!url || !sourceExpression) {
		return false;
	}

	if (!sourceExpression) { urlHelper.href = url; }
	const absoluteUrl = urlHelper.href;

	// check source expression
	if (!absoluteUrl.match(sourceRegularExpression)) {
		return false;
	}

	return true;
};

const addWebpImages = () => {
	// replace images with webp version on the fly before they are loaded
	document.addEventListener('lazybeforeunveil', function (e) {
		const element = e.target;

		if (element.tagName === 'IMG') {
			const parent = element.parentNode;

			if (parent.tagName === 'PICTURE') {
				// picture tags
				const sources = Array.from(parent.querySelectorAll('source'));

				// clone the sources
				if (sources.length) {
					sources.forEach(source => {
						const dataSrcset = source.getAttribute('data-srcset');

						if (!validImage(dataSrcset)) {
							return;
						}

						const newSource = source.cloneNode();
						const newSrcset = dataSrcset.replace(imageTypeRegex, '.webp');

						newSource.setAttribute('data-srcset', newSrcset);
						newSource.setAttribute('type', 'image/webp');

						parent.insertBefore(newSource, source);
					});
				}

				// also create a source for the <img> element
				const dataSrcset = element.getAttribute('data-srcset');
				if (dataSrcset && validImage(dataSrcset)) {
					const newSrcset = dataSrcset.replace(imageTypeRegex, '.webp');
					const newSource = document.createElement('source');
					newSource.setAttribute('data-srcset', newSrcset);
					newSource.setAttribute('type', 'image/webp');
					parent.insertBefore(newSource, element);
				}
			} else {
				// standard image tags
				const dataSrc = element.getAttribute('data-src');

				if (dataSrc && validImage(dataSrc)) {
					const newSrc = dataSrc.replace(imageTypeRegex, '.webp');
					element.setAttribute('data-src', newSrc);
				}
			}
		} else {
			// background images
			const bg = element.getAttribute('data-bg');

			if (bg && validImage(bg)) {
				const newBg = bg.replace(imageTypeRegex, '.webp');
				element.setAttribute('data-bg', newBg);
			}
		}
	});
};

function checkWebpSupport () {
	if (window.localStorage.getItem('webp-available')) return true;
	let webpAvailable = false;
	const elem = document.createElement('canvas');
	if (elem.getContext && elem.getContext('2d')) {
		webpAvailable = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
		window.localStorage.setItem('webp-available', true);
	}
	return webpAvailable;
}

export default {
	lazySizes,
	init () {
		sourceExpression = ProjectConfig.get('webp.sourceExpression');
		sourceRegularExpression = new RegExp(sourceExpression, 'i');

		if (checkWebpSupport()) {
			addWebpImages();
		}

		lazySizes.init();
	},
};
