import { addGlobalEventListeners } from 'Models/emit-debounced-events';
import { initBreakpointWatching } from 'Models/breakpoints';
import checkForTouch from 'Models/check-for-touch';
import { initWindowHeightWatching } from 'Models/window-height';

addGlobalEventListeners();
initBreakpointWatching();
checkForTouch();
initWindowHeightWatching();
