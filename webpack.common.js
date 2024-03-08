import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		publicPath: '{public_path}',
	},
	resolve: {
		extensions: ['*', '.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm-bundler.js',
			Scripts: path.resolve(__dirname, 'templates/src/assets/scripts'),
			Models: path.resolve(__dirname, 'templates/src/assets/scripts/models'),
			Components: path.resolve(__dirname, 'templates/src/assets/scripts/components'),
			Bootstrap: path.resolve(__dirname, 'templates/src/assets/scripts/bootstrap'),
			Store: path.resolve(__dirname, 'templates/src/assets/scripts/store'),
			InlineIcons: path.resolve(__dirname, 'templates/src/assets/icons/inline'),
		},
		unsafeCache: false, // to reload on new files, can drop performance of build task
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false,
				},
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-syntax-dynamic-import',
							'@babel/plugin-proposal-object-rest-spread',
							['@babel/plugin-transform-runtime', { regenerator: true }],
						],
					},
				},
			},
			{
				enforce: 'pre',
				test: /\.scss$/,
				use: ['import-glob-loader'],
			},
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { url: false },
					},
					'postcss-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.resolve(__dirname, 'templates/src/assets/styles/_webpack-common.scss'),
							],
						},
					},
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),

		// Bundler Build Feature Flags for vuejs. see https://link.vuejs.org/feature-flags
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true,
		}),

		new MiniCssExtractPlugin({
			chunkFilename: '[name].[contenthash].css',
		}),

		new ESLintPlugin({
			fix: true,
			cache: true,
		}),
	],
	stats: {
		version: false,
		builtAt: false,
		assets: false,
		entrypoints: false,
		moduleTrace: false,
		publicPath: false,
		errorDetails: false,
		reasons: false,
		source: false,
	},
};
