/* global lazySizes */
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/respimg/ls.respimg';
import { breakpoints } from 'Models/breakpoints';

lazySizes.cfg.customMedia = {};

for (const breakpoint in breakpoints) {
	lazySizes.cfg.customMedia[`--${breakpoint}`] = `(min-width: ${breakpoints[breakpoint]}px)`;
	lazySizes.cfg.customMedia[`--until-${breakpoint}`] = `(max-width: ${breakpoints[breakpoint]}px)`;
}
