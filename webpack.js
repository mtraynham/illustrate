import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    entry: './index.js',
    output: {
        filename: 'illustrate.js',
        library: 'illustrate',
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

export const karma = merge({}, build, {
    devtool: 'inline-source-map'
});

export const debug = merge({}, build, {
    cache: true,
    debug: true,
    devtool: 'inline-sourcemap',
    entry: './debug/index.js',
    output: {
        path: resolve('./test/'),
        publicPath: 'test/',
        pathinfo: true,
        filename: 'illustrate.[hash].js',
        library: undefined,
        libraryTarget: undefined,
        devtoolModuleFilenameTemplate: 'webpack:///illustrate/[resource-path]'
    },
    plugins: [
        new ExtractTextPlugin('illustrate.css'),
        new HtmlWebpackPlugin({
            port: 3000,
            template: resolve('./debug/index.ejs')
        })
    ]
});
