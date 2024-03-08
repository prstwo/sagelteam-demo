
# Front-End Jumpstart v2.1.15

[[toc]]

## Dependencies

- Node.js (version >= 12, < 17)
- or install nvm and get the correct version with `nvm use`

## Editorconfig

The Jumpstart comes with an .editorconfig file to keep consistent coding styles for all developers. Please make sure to install the matching plugin for your code editor, e.g. ["EditorConfig for VS Code"](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) to enable it.

## How to start

1. Run command `npm install` to install the dependencies
2. Run command `npm run build` to build the files
3. Setup vhost for the project. Point your root to the `templates/dist` folder so you can directly open the templates in the browser

## Commands

You can use `npm run` to run all the commands.

| Command | Description |
| --- | --- |
| `build` | Build all files |
| `watch` | Watch files |
| `clean:assets` | Remove all built assets in development distribution directories |

## PHP

PHP layer is built around standard PHP files and, so called, generators. Generators are functions that are meant to generate HTML code. 

Generators can be of the type: "components".

"Components" are small, repeatable elements, i.e. a button or an article teaser.

### Components

To create a new component create a new file in the `generators/components` directory (based on the `_compontents-blueprint.php` file) and reference the name of that file in the `generators/index.php` file, in the `components` array. Each component takes a `data` object as a parameter, where every key of an array becomes a variable that can be used in it's template (after being merged with the `data_defaults` array).

#### Button component

Generate button with the `generate_component_button()` function. It comes with a set of predefined styles and options. The styles can / should be adapted to match the project. See the `breakdown.php` file for examples.

```php
generate_component_button([
    'label' => 'Cookie Settings',
    'href' => 'https://agentur-loop.com',
]);
```

#### Headline component

Generate headline (h1, h2, h3, h4, h5, h6) with the `generate_component_headline()` function:

```php
echo generate_component_headline([
    'label' => 'My title',
    'tag' => 'h3',
    'class' => 'example__title'
]);
```

#### Icon component

Generate icon with the `generate_component_icon()` function. Learn more about the icon system in the "Icons" section.

```php
echo generate_component_icon([
    'name' => 'close',
    'type' => 'symbol',
    'class' => 'overlay__close'
]);
```

#### Image component

Generate responsive image with the `generate_component_image()` function. The `sources` attribute is an array of image versions resized to different sizes. `sources.width` should always state the actual pixel width of the image source. Browser will choose the best image to load based on the displayed size and device pixel density. Mind that these sources are not reliable when you want to display a different image for mobile version. In that case the `responsive_sources` attribute can be used, which also takes an array of image versions, along with the `responsive_sources.media` field. The values for the `responsive_sources.media` field match with the SCSS / JS breakpoints and are available both for max- and min-width, though they can not be mixed, it always has to either all max or all min. If the `responsive_sources.media` field is omitted in an entry, it will be treated as the fallback image. If there is no fallback image in the `responsive_sources`, the normal `sources` images will be used as fallback. Please make sure to always define a fallback.

Example with `sources`:
```php
echo generate_component_image([
    'sources' => [
        [
            'src' => '/path/to/image-small.png',
            'width' => 760,
        ],
        [
            'src' => '/path/to/image-medium.png',
            'width' => 1440,
        ],
        [
            'src' => '/path/to/image-big.png',
            'width' => 1920,
        ],
    ],
    'alt' => 'Alt title attribute'
    'class' => 'hero__image',
]);
```

Example with `responsive_sources` and mobile-first. Please note that the largest breakpoint has to be on top of the list for it to work correctly. Fallback is provided inside `responsive_sources`.
```php
echo generate_component_image([
    'responsive_sources' => [
		[
            'src' => '/path/to/image-big.png',
            'media' => '--notebook',
        ],
		[
            'src' => '/path/to/image-medium.png',
            'media' => '--tablet-landscape',
        ],
        [
            'src' => '/path/to/image-small.png',
            'media' => '--tablet',
        ],
		[
            'src' => '/path/to/image-small.png',
        ],
    ],
    'alt' => 'Alt title attribute'
    'class' => 'hero__image',
]);
```

Example with `responsive_sources` and desktop-first. Please note that the smallest breakpoint has to be on top of the list for it to work correctly. Fallback is provided inside `sources`.
```php
echo generate_component_image([
    'responsive_sources' => [
		[
            'src' => '/path/to/image-small.png',
            'media' => '--until-tablet',
        ],
		[
            'src' => '/path/to/image-medium.png',
            'media' => '--until-tablet-landscape',
        ],
		[
            'src' => '/path/to/image-big.png',
            'media' => '--until-notebook',
        ],
    ],
	'sources' => [
        [
            'src' => '/path/to/image-small.png',
            'width' => 760,
        ],
    ],
    'alt' => 'Alt title attribute'
    'class' => 'hero__image',
]);
```

## Scripts

The scripts system is based on vanilla javascript and vue.js. By default vue.js is disabled and has to be enabled by uncommenting all the lines that are anotated with "Uncomment to enable Vue.js components"

`scripts` directory is split into four main sections:

| Folder | Description |
| --- | --- |
| `bootstrap` | Code used to initiate the system and register all components |
| `components` | Vanilla and Vue.js components |
| `models` | Model files containing a reusable logic used in the components |
| `store` | A vuex store instance to define global variable storage |

Dev talks video: **Scripts - Introduction**

![](https://docs.frontend.agentur-loop.com/assets/videos/scripts-1.mp4)

Example `load-content.js` file from the video: [load-content.js](https://docs.frontend.agentur-loop.com/assets/videos/files/load-content.js)

### Bootstrap

Use `init` folder to register your components and global models. 

Each component (vanilla or vue) can be registered as a static or async component. Async components will be downloaded as separate files which helps to keep the main.js filesize down but results in a longer time until the script is initiated, so choose what's the best option on a case-by-case basis.

Most of the models will be imported in one of the components, as they are mostly used to add a logic layer to the component. In case you need a model that's not connected to any component but it's required to run at the page load - you may import it in the `init/global-models.js` file.

Use `vendor` folder to register all the external dependencies, like polyfills or global libraries.

### Components

This is where most of your code will live - you can decide if you want to create a vanilla js or vue.js component. 
Whenever possible use vanilla.js as it will usually provide better performance. Use vue.js for more complicated components.

Components are only instantiated when there is a DOM element that triggers them. To instantiate a component on a DOM element add this data attribute: `data-component='{"component": "component-name"}'`. In case of vue components an existence of `data-component` is enough, as the component name is derived from the DOM node name and the default value for the `factory` setting is `vue`.

Example of vanilla script instantiation:
```html
<div data-component='{"component": "vanilla-example-one"}'></div>
```

Example of vue.js script instantiation (follow next step to enable them in your project):
```html
<vue-example-one data-component='{"factory": "vue"}'></vue-example-one>
```

Component is by default initialised when the browser has free resources, which can cause some delay in the component load time. If you want to force the component initialisation as soon as possible for critical components - use a `"immediate": true` parameter, i.e.:
```html
<div data-component='{"component": "header", "immediate": true}'></div>
```

If you want to ignore the component initialisation on page load (i.e. because you want to manually initialise it later) - use a `"ignoreOnPageLoad": true` parameter, i.e.:
```html
<div data-component='{"component": "map", "ignoreOnPageLoad": true}'></div>
```

If you want to initialise previously unintialized components inside a specific container, use following method:
```js
import { parse } from 'Models/utils/app';
// ...
function initalize () {
    parse(containerEl);
}
```

### Enable Vue.js components

To enable Vue.js components in your project search for the following string in your `scripts` directory: "Uncomment to enable Vue.js components".
Then uncomment all occurences of the code next to that string.
Make sure to use the same name for the HTML tag & file.

### Models

Models serve as a logic layer for components, which means you can reuse the same logic no mather what the component is (components serve as a "view" layer and models as "logic" layer). 

I.e. a `articles` model can contain a method to fetch a list of articles from a remote server and return the list in a sorted order. This logic can now be shared by `article-teasers` and `featured-articles` components that provide a completely different layout but rely on the same underlying data. If the model exports a `fetchAndSortArticles` method it can be used in the component in a following way:

```js
import { fetchAndSortArticles } from 'Models/articles';

...

function getArticles () {
    let articles = fetchAndSortArticles();
}
```

Models should be used to store the logic and make keep the component code clean even if the logic is not planned to be reused by other components.

### Included models

#### Global debounced events

`emit-debounced-events.js` model emits a `window-resized` event that is debounced. Listen to this event instead of the generic `window.onResize` event.

#### Breakpoints

`breakpoints.js` model allows you to:
- get list of currently active media query breakpoints (`currentlyActiveBreakpoints`)
- listen to a `active-breakpoints-change` event that is triggered every time window width is reaching a new breakpoint. A list of active breakpoints is transmitted as a detail object of that event.

#### HTTP Request

Instead of using `fetch` directly use the `call` function imported from `http-request` model.

Example:
```js
import { call } from 'Models/http-request';
...
try {
    const response = await call(url);
    if (response.status === 'success') {
        ...
    } else {
        ...error handling
    }
} catch (e) {
    console.error(e);
    ...error handling
}
```

#### Preloader

Show/hide a preloader inside an element

```js
import { showPreloader, hidePreloader } from 'Models/preloader';
...
const options = {
    size: 'small',
    color: 'primary'
}
showPreloader(myDomElement, options)
```

`options` parameter is an object which can specify additional `color` and `size` parameters.
This will add classes to the main element, like so: `preloader--your-color` and `preloader--your-size` that you can later style in your `_preloader.scss` file.

#### Dimmer

Dim page (i.e. when you show a side drawer)

```js
import { dimPage, undimPage } from 'Models/dimmer';
...
dimPage();
...
undimPage();
```
#### Locker

Lock page scrolling (i.e. when you show a side drawer)

```js
import { lockPage, unlockPage } from 'Models/locker';
...
lockPage();
...
unlockPage();
```

### Store

Store provides a way to share data between various components and models in the system. The store is not included in the final script package until at least one script imports it to it's scope (`import store from Store`).

The store system is based on the `vuex` package. Check vuex documentation for more details.


### Directory aliases

System provides directory aliases for `import` statements in order to simplify the import structure.

I.e. you can use `import { fetchAndSortArticles } from 'Models/articles';` instead of `import { fetchAndSortArticles } from '/templates/src/assets/scripts/models/articles';`

| Alias | Path |
| --- | --- |
| Scripts | `templates/src/assets/scripts`|
| Models | `templates/src/assets/scripts/models`|
| Components | `templates/src/assets/scripts/components`|
| Bootstrap | `templates/src/assets/scripts/bootstrap`|
| Store | `templates/src/assets/scripts/store`|
| InlineIcons | `templates/src/assets/icons/inline`|

## Styles

Styles are written in .scss file format.

### Media Queries

A `sass-mq` library is used to generate media query mixins. The breakpoints are defined in `_variables.scss`, in the `$mq-breakpoints` object. Media queries use mobile-first approach. Check [sass-mq documentation](https://github.com/sass-mq/sass-mq) for more info.

Example use:
```scss
@include mq(laptop) { // wider than 'laptop' breakpoint
    background-color: red;
}
@include mq($until: tablet) { // narrower than 'tablet' breakpoint
    background-color: yellow;
}
@include mq($from: tablet, $until: desktop) { // between 'tablet' and 'desktop' breakpoints
    background-color: green;
}
```

### Grid

Use [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) for your grid needs. There is nothing special about the way we use it except Jumpstart provides the predefined variables called `$grid-gutter`. Use it to keep the grid gaps consistent throughout the modules. You can also use the grid SCSS mixin, which provides 4 (mobile), 8 (tablet) and 12 (desktop) columns to match the ATOMS design system.

Example use:
```scss
.my-module__items {
	display: grid;
	gap: $grid-gutter;
	grid-template-columns: minmax(100px, 1fr);
	@include mq(desktop) {
		grid-template-columns: repeat(2, minmax(100px, 1fr)) 2fr;
	}
}
```

To use the grid mixin, simply include it in your SCSS. You can then define which columns should be covered by each item.
```scss
.my-module__main {
	@include grid;
}
.my-module__main__item {
	grid-column: span 3;
}
```

If you need to use different dynamic grids with the same gap, you could create a separate class and use it like this:

```html
<div class="ui-grid my-module__items">
	...
</div>
```

```scss
.ui-grid {
	display: grid;
	gap: $grid-gutter;
}

.my-module__items {
	grid-template-columns: minmax(100px, 1fr);
	@include mq(desktop) {
			grid-template-columns: repeat(2, minmax(100px, 1fr)) 2fr;
	}
}
```

## Icons

The icons may be used in two different modes - `inline` or `symbol`.

### Inline
"Inline" icons should be used in most cases. Basically this are standard .svg images that are being inlined into the HTML and can be styled in all the standard ways (coloring the `fill` or `path` with css, animating only parts of .svg, etc). To add an "inline" icon save it in the `icons/inline` directory.

### Symbol
"Symbol" icons should be used for icons that repeat a lot on the same page (i.e. an arrow in the accordion module). All the "symbol" icons are bundled together into a `symbols.svg` file that's being called by a `<symbol>` svg tag. As the `symbols.svg` file will get downloaded if at least one of the symbol icons is present on the page try to keep the amount of icons stored there to minimum to minimize the amount of unused data being transfered.

#### Usage in PHP
There is an `icon` component prepared to display the icon on the page.

Example use (inline mode):
```php
echo generate_component_icon([
    'name' => 'checkmark-inline',
    'class' => 'example__block__icon'
]); 
```

Example use (symbol mode):
```php
echo generate_component_icon([
    'name' => 'checkmark-symbol',
    'type' => 'symbol',
    'class' => 'example__block__icon'
]); 
```


#### Usage in .vue file
There is an `icon` component prepared to display the icon on the page.


Example use (inline mode):
```html
<template>
    <div class="vue-example-one">
        <icon class="vue-example-one__icon" type="inline" v-html="checkmarkInlineIconSvg"></icon>
    </div>
</template>
```

```js
import checkmarkInlineIcon from 'InlineIcons/checkmark-inline.svg';
export default {
    data () {
        return {
            checkmarkInlineIconSvg: checkmarkInlineIcon,
        };
    },
};
```

Example use (symbol mode):
```html
<template>
    <div class="vue-example-two">
        <icon class="vue-example-two__icon" name="checkmark-symbol" type="symbol"></icon>
    </div>
</template>
```

## Lazyloading

Images can be lazy loading using a `.lazyload` class on the `img` element. To provide a single source use `data-src` attribute, for multiple sources use `data-srcset` property. Background images can't be lazyloaded but it's ok to use `img` elements also for backgrounds as an `object-fit` css property allows you to set the image size to `cover` or `contain` if you need that.

Single source example:

```html
<img data-src="/your/image/url/150px.jpg" class="lazyload">
```

Multiple source example (browser will decide on it's own which image to use in given context, you just provide it with the width of the image):
```html
<img
    data-sizes="auto"
    data-srcset="/your/image/url/150px.jpg 150w, 
        /your/image/url/700px.jpg 700w, 
        /your/image/url/1500px.jpg 1500w"
    class="lazyload" 
/>
```

CSS Object-fit example:
```css
img {
    position: absolute;
	display: block;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	object-fit: contain;
}
```


For more info and examples check the [official lazysizes documentation](https://github.com/aFarkas/lazysizes)


## Other asset directories

For all assets that don't fit to other folder you may create new folders in the `assets` directory. By default the only asset folder that's being simply copied to the distribution directories without any modification is `fonts`. If you add other folder like this (i.e. `videos`) you should add it to the `COPIED_ASSETS_DIRECTORIES` array in `gulpfile.js`.