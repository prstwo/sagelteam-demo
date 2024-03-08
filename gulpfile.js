import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sassGlob from 'gulp-sass-glob';
import rename from 'gulp-rename';
import include from 'gulp-include';
import notify from 'gulp-notify';
import webp from 'gulp-webp';
import del from 'del';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import replace from 'gulp-replace';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import clone from 'gulp-clone';
const sass = gulpSass(dartSass);
const clonesink = clone.sink();
const COPIED_ASSETS_DIRECTORIES = ['fonts']; // you may add here a list of asset directories that should be copied 1-to-1 to the asset distribution folders
const PATHS = {
	source: 'templates/src/',
	distribution: 'templates/dist/',
	assets: 'assets/',
	styles: 'styles/',
	scripts: 'scripts/',
	images: 'images/',
	icons: 'icons/',
	generators: 'generators/',
	symbolIcons: 'symbols/',
	inlineIcons: 'inline/',
};

const DEFAULT_PROJECT_CONFIG = {
	assetDistributionDirectories: [{ directory: PATHS.distribution + PATHS.assets }],
};

function styles () {
	const assetDistributionDirectories = getAssetDistributionDirectories();

	let stream = gulp
		.src(PATHS.source + PATHS.assets + PATHS.styles + '*.scss')
		.pipe(sassGlob())
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running sass/sassGlob task',
			}),
		)
		.pipe(
			sass({
				includePaths: ['node_modules'],
			}),
		)
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running sass/include task',
			}),
		)
		.pipe(include())
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running sass/include task',
			}),
		)
		.pipe(postcss())
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running sass/postcss task',
			}),
		)
		.on(
			'error',
			notify.onError({
				message: 'Error: CSS Min',
				title: 'Error running sass/cleanCSS task',
			}),
		);

	assetDistributionDirectories.forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory + PATHS.styles));
	});

	return stream;
}

async function scripts () {
	const webpackConfigMode = 'common';
	const webpackConfig = await import('./webpack.' + webpackConfigMode + '.js');

	let stream = gulp
		.src(PATHS.source + PATHS.assets + PATHS.scripts + '*.js')
		.pipe(named())
		.pipe(gulpWebpack(webpackConfig.default, webpack))
		.on('error', function (error) {
			console.error(error);
			this.emit('end');
		})
		.pipe(replace('"{public_path}"', 'window.publicPaths.js'))
		.on(
			'error',
			notify.onError({
				message: 'Error: Scripts String Replace',
				title: 'Error running scripts/replace task',
			}),
		);

	getAssetDistributionDirectories().forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory + PATHS.scripts));
	});

	return stream;
}

function copy () {
	const sourceDirectories = getFullCopiedAssetDirectories().map((dir) => {
		return dir + '/**/*';
	});
	let stream = gulp.src(sourceDirectories, { base: PATHS.source + PATHS.assets });

	getAssetDistributionDirectories().forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory));
	});

	return stream;
}

function html () {
	const stream = gulp
		.src([PATHS.source + '**/*.html', PATHS.source + '**/*.php', PATHS.source + '**/*.json', '!' + PATHS.source + PATHS.assets + '**/*'])
		.on(
			'error',
			notify.onError({
				message: 'Error: HTML String Replace',
				title: 'Error running html/replace task',
			}),
		)
		.pipe(gulp.dest(PATHS.distribution));

	return stream;
}

function images () {
	let stream = gulp
		.src(PATHS.source + PATHS.assets + PATHS.images + '**')
		.pipe(clonesink)
		.pipe(webp())
		.pipe(clonesink.tap())
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running image/imagemin task',
			}),
		);

	getAssetDistributionDirectories().forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory + PATHS.images));
	});

	return stream;
}

function iconsSymbols () {
	let stream = gulp
		.src(PATHS.source + PATHS.assets + PATHS.icons + PATHS.symbolIcons + '*.svg')
		.pipe(rename({ prefix: 'icon-' }))
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running icons/rename task',
			}),
		)
		.pipe(
			svgmin({
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
								removeComments: true,
								removeDoctype: true,
								cleanupNumericValues: {
									floatPrecision: 2,
								},
								convertColors: {
									names2hex: true,
									rgb2hex: true,
								},
							},
						},
					},
					{
						removeViewBox: false,
					},
				],
			}),
		)
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running icons/svgmin task',
			}),
		)
		.pipe(svgstore({ inlineSvg: true }))
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running icons/svgstore task',
			}),
		);

	getAssetDistributionDirectories().forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory + PATHS.icons));
	});

	return stream;
}

function iconsInline () {
	let stream = gulp
		.src(PATHS.source + PATHS.assets + PATHS.icons + PATHS.inlineIcons + '*.svg')
		.pipe(
			svgmin({
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
								removeComments: true,
								removeDoctype: true,
								cleanupNumericValues: {
									floatPrecision: 2,
								},
								convertColors: {
									names2hex: true,
									rgb2hex: true,
								},
							},
						},
					},
					{
						removeViewBox: false,
					},
				],
			}),
		)
		.on(
			'error',
			notify.onError({
				message: 'Error: <%= error.message %>',
				title: 'Error running icons/svgmin task',
			}),
		);

	getAssetDistributionDirectories().forEach(function (assetsDistributionDirectory) {
		stream = stream.pipe(gulp.dest(assetsDistributionDirectory + PATHS.icons + PATHS.inlineIcons));
	});

	return stream;
}

function cleanAssets () {
	return del(getAssetDistributionDirectories());
}

function getAssetDistributionDirectories () {
	const allDirectories = DEFAULT_PROJECT_CONFIG.assetDistributionDirectories;
	return getDistributionDirectories(allDirectories);
}

function getDistributionDirectories (allDirectories) {
	if (!allDirectories) return [];
	const filteredDirectories = allDirectories.filter((item) => {
		return item.mode === undefined || item.mode === '';
	});
	const filteredDirectoryPaths = filteredDirectories.map((item) => {
		if (item.directory.substr(-1) !== '/') {
			item.directory += '/';
		}
		return item.directory;
	});
	return filteredDirectoryPaths;
}

async function watchAssets () {
	gulp.watch(PATHS.source + PATHS.assets + PATHS.scripts, scripts);
	gulp.watch(PATHS.source + PATHS.assets + PATHS.styles, stylesTasks);
	gulp.watch(PATHS.source + PATHS.assets + PATHS.images, images);
	gulp.watch(PATHS.source + PATHS.assets + PATHS.icons, gulp.parallel(iconsSymbols, iconsInline));
	gulp.watch(
		[PATHS.source + '**/*.html', PATHS.source + '**/*.php', '!' + PATHS.source + PATHS.assets + '**/*'],
		html,
	);
	gulp.watch(getFullCopiedAssetDirectories(), copy);
}

function getFullCopiedAssetDirectories () {
	return COPIED_ASSETS_DIRECTORIES.map((dir) => {
		return PATHS.source + PATHS.assets + dir;
	});
}

function getStylesTask () {
	return styles;
}

const stylesTasks = getStylesTask();

const icons = gulp.parallel(iconsSymbols, iconsInline);

const build = gulp.series(
	cleanAssets,
	gulp.parallel(iconsSymbols, iconsInline),
	gulp.parallel(scripts, stylesTasks, images, copy, html),
);

export { icons, stylesTasks as styles, scripts, images, copy, html, cleanAssets, watchAssets as watch, build };
