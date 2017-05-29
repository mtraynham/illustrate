import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import {strategy} from 'webpack-merge';
import cssnano from 'cssnano';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import pkg from './package.json';

const merge = strategy(({plugins: 'replace', 'module.rules': 'replace'}));

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

const bannerPlugin = new BannerPlugin({banner, raw: true});
const extractTextPluginOptions = {
    filename: '[name].css',
    disable: false,
    allChunks: true
};
const extractTextPlugin = new ExtractTextPlugin(extractTextPluginOptions);
const extractTextMinifyPlugin = new ExtractTextPlugin(Object.assign({}, extractTextPluginOptions, {filename: '[name].min.css'}));
const htmlPlugin = new HtmlWebpackPlugin({
    template: resolve('./debug/index.ejs'),
    port: 3000
});
const occurrenceOrderPlugin = new OccurrenceOrderPlugin();
const optimizeAssetsCssPlugin = new OptimizeCssAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {discardComments: {removeAll: true}}
});
const uglifyJsPlugin = new UglifyJsPlugin({sourceMap: true, comments: false});

export const build = {
    devtool: 'source-map',
    entry: {
        [pkg.name]: resolve('./index.js')
    },
    output: {
        filename: '[name].js',
        library: 'illustrate',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]`
    },
    plugins: [
        bannerPlugin,
        extractTextPlugin,
        occurrenceOrderPlugin
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', use: 'eslint-loader'},
            {test: /\.js$/, use: 'babel-loader'},
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
            }
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: '[name].min.js'
    },
    plugins: [
        bannerPlugin,
        extractTextMinifyPlugin,
        occurrenceOrderPlugin,
        optimizeAssetsCssPlugin,
        uglifyJsPlugin
    ]
});

export const karma = merge({}, build, {
    devtool: 'inline-source-map',
    plugins: [
        bannerPlugin,
        occurrenceOrderPlugin
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', use: 'eslint-loader'},
            {test: /\.js$/, use: 'babel-loader'},
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
});

export const debug = merge({}, build, {
    cache: true,
    devtool: 'inline-source-map',
    entry: {
        [pkg.name]: resolve('./debug/index.js')
    },
    output: {
        library: undefined,
        libraryTarget: undefined
    },
    plugins: [
        bannerPlugin,
        extractTextPlugin,
        htmlPlugin,
        occurrenceOrderPlugin
    ]
});
