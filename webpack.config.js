import template from 'lodash/template';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import {readFileSync} from 'fs';
import {cpus} from 'os';
import {join, resolve} from 'path';
import {strategy} from 'webpack-merge';
import BannerPlugin from 'webpack/lib/BannerPlugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import nodeExternals from 'webpack-node-externals';
import pkg from './package.json';

const merge = strategy(({externals: 'replace', plugins: 'replace', 'module.rules': 'replace'}));

// ----------------------------------------------------------------------------
// Plugins
// ----------------------------------------------------------------------------
const banner = template(readFileSync(join(__dirname, 'LICENSE_BANNER'), 'utf8'))({
    pkg,
    date: new Date()
});
const extractTextPluginOptions = {
    filename: '[name].css',
    disable: false,
    allChunks: true
};
const forkTsCheckerWebpackOptions = {
    checkSyntacticErrors: true,
    tslint: true
};
const forkTsCheckerWebpackWatchOptions = Object.assign({}, forkTsCheckerWebpackOptions, {
    watch: ['./src']
});
const plugins = {
    banner: new BannerPlugin({banner, raw: true}),
    extractText: new ExtractTextPlugin(extractTextPluginOptions),
    extractTextMinify: new ExtractTextPlugin(Object.assign({}, extractTextPluginOptions, {filename: '[name].min.css'})),
    forkTsCheckerWebpack: new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackOptions),
    forkTsCheckerWebpackWatch: new ForkTsCheckerWebpackPlugin(forkTsCheckerWebpackWatchOptions),
    html: new HtmlWebpackPlugin({
        template: resolve('./debug/index.ejs'),
        port: 3000
    }),
    optimizeCssAssets: new OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {discardComments: {removeAll: true}}
    }),
    stylelint: new StylelintWebpackPlugin(),
    uglifyJs: new UglifyJsPlugin({sourceMap: false, comments: false})
};

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------
const postCssLoader = {
    loader: 'postcss-loader',
    options: {plugins: () => [autoprefixer]}
};
const rules = {
    eslint: {test: /\.js$/, exclude: /node_modules/, enforce: 'pre', use: 'eslint-loader'},
    js: {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {loader: 'cache-loader', options: {cacheDirectory: './.cache/js'}},
            {loader: 'thread-loader', options: {workers: cpus().length - 1}},
            {loader: 'babel-loader', options: {cacheDirectory: true}}
        ]
    },
    ts: {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
            {loader: 'cache-loader', options: {cacheDirectory: './.cache/ts'}},
            {loader: 'thread-loader', options: {workers: cpus().length - 1}},
            {loader: 'babel-loader', options: {cacheDirectory: true}},
            {loader: 'ts-loader', options: {happyPackMode: true}}
        ]
    },
    istanbulInstrumenter: {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        enforce: 'post',
        use: {loader: 'istanbul-instrumenter-loader', options: {esModules: true}}
    },
    css: {test: /\.css$/, use: ['style-loader', 'css-loader', postCssLoader]},
    cssExtract: {test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', postCssLoader]})},
    less: {test: /\.less/, use: ['style-loader', 'css-loader', postCssLoader, 'less-loader']},
    lessExtract: {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', postCssLoader, 'less-loader']})
    },
    sass: {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', postCssLoader, 'sass-loader']
    },
    sassExtract: {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', postCssLoader, 'sass-loader']})
    }
};

// ----------------------------------------------------------------------------
// CONFIGS
// ----------------------------------------------------------------------------
export const build = {
    devtool: 'source-map',
    entry: {
        [pkg.name]: resolve('./index.ts')
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: '[name].js',
        library: 'illustrate',
        libraryTarget: 'umd'
    },
    plugins: [
        plugins.forkTsCheckerWebpack,
        plugins.stylelint,
        plugins.extractText,
        plugins.banner
    ],
    module: {
        rules: [
            rules.eslint,
            rules.js,
            rules.ts,
            rules.cssExtract,
            rules.lessExtract,
            rules.sassExtract
        ]
    }
};

export const uglify = merge({}, build, {
    output: {
        filename: '[name].min.js'
    },
    plugins: [
        plugins.forkTsCheckerWebpack,
        plugins.stylelint,
        plugins.extractTextMinify,
        plugins.optimizeCssAssets,
        plugins.uglifyJs,
        plugins.banner
    ]
});

export const karma = merge({}, build, {
    devtool: 'inline-source-map',
    externals: [],
    plugins: [
        plugins.forkTsCheckerWebpack,
        plugins.stylelint,
        plugins.banner
    ],
    module: {
        rules: [
            rules.eslint,
            rules.js,
            rules.ts,
            rules.css,
            rules.less,
            rules.sass,
            rules.istanbulInstrumenter
        ]
    }
});

export const debug = merge({}, build, {
    devtool: 'eval',
    cache: true,
    entry: {
        [pkg.name]: resolve('./debug/index.ts')
    },
    externals: [],
    output: {
        library: undefined,
        libraryTarget: undefined
    },
    plugins: [
        plugins.forkTsCheckerWebpackWatch,
        plugins.stylelint,
        plugins.extractText,
        plugins.banner,
        plugins.html
    ]
});
