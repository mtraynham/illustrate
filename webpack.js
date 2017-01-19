import merge from 'lodash/merge';
import template from 'lodash/template';
import {readFileSync} from 'fs';
import {join, resolve} from 'path';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import LoaderOptionsPlugin from 'webpack/lib/LoaderOptionsPlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';

const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});

export const build = {
    entry: resolve('./index.js'),
    output: {
        filename: 'illustrate.js',
        library: 'illustrate',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: 'webpack:///illustrate/[resource-path]'
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin({filename: 'illustrate.css', disable: false, allChunks: true}),
        new BannerPlugin({banner, raw: true})
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
        new ExtractTextPlugin({filename: 'illustrate.min.css', disable: false, allChunks: true}),
        new UglifyJsPlugin(),
        new BannerPlugin({banner, raw: true})
    ]
});

export const karma = merge({}, build, {
    devtool: 'inline-source-map'
});

export const debug = merge({}, build, {
    cache: true,
    devtool: 'inline-sourcemap',
    entry: resolve('./debug/index.js'),
    output: {
        path: resolve('./test/'),
        publicPath: 'test/',
        pathinfo: true,
        library: undefined,
        libraryTarget: undefined
    },
    plugins: [
        new LoaderOptionsPlugin({debug: true}),
        new ExtractTextPlugin({filename: 'illustrate.css', disable: false, allChunks: true}),
        new HtmlWebpackPlugin({
            port: 3000,
            template: resolve('./debug/index.ejs')
        })
    ]
});
