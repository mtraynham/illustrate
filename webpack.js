import pkg from './package';
import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join} from 'path';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import JasminePlugin from 'gulp-jasmine-browser/webpack/jasmine-plugin';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    entry: './index.js',
    output: {
        filename: 'illustrate.js',
        library: 'bd',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///illustrate/[resource-path]'
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('illustrate.css'),
        new BannerPlugin(banner, {raw: true})
    ],
    module: {
        preLoaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['eslint-loader']}
        ],
        loaders: [
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')}
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: 'illustrate.min.js'
    },
    plugins: [
        new ExtractTextPlugin('illustrate.min.css'),
        new UglifyJsPlugin(),
        new BannerPlugin(banner, {raw: true})
    ]
});

export const spec = merge({}, build, {
    entry: null,
    output: {
        filename: 'spec.js'
    },
    plugins: [
        new ExtractTextPlugin('illustrate.css'),
        new JasminePlugin()
    ]
});
