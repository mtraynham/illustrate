import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import cssnano from 'cssnano';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import pkg from './package.json';

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
const uglifyJsPlugin = new UglifyJsPlugin({sourceMap: false, comments: false});

export const build = {
    entry: {
        illustrate: resolve('./index.js')
    },
    output: {
        filename: 'illustrate.js',
        library: 'illustrate',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///illustrate/[resource-path]'
    },
    devtool: 'source-map',
    plugins: [
        bannerPlugin,
        extractTextPlugin,
        occurrenceOrderPlugin
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', loader: 'eslint-loader'},
            {test: /\.js$/, loader: 'babel-loader'},
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader', 'sass-loader']})
            }
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: 'illustrate.min.js'
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
    devtool: 'inline-source-map'
});

export const debug = merge({}, build, {
    cache: true,
    devtool: 'inline-source-map',
    entry: resolve('./debug/index.js'),
    output: {
        path: resolve('./test/'),
        publicPath: 'test/',
        pathinfo: true,
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
