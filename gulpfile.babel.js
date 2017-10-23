import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import open from 'open';
import {Linter} from 'tslint';
import stylelintFormatterPretty from 'stylelint-formatter-pretty';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import {Server} from 'karma';
import * as webpackConfig from './webpack.config';
import jsdocConfig from './jsdoc.json';

const $ = gulpLoadPlugins();
const debugHost = '0.0.0.0';
const debugPort = 3000;

/**
 * Run a webpack build
 * @param {Object} opts
 * @param {String} dest
 * @param {Function} [done]
 * @returns {void}
 */
function webpackBuild (opts, dest, done) {
    return gulp.src('')
        .pipe(webpackStream(opts, webpack))
        .once('error', done)
        .pipe(gulp.dest(dest));
}

/**
 * Run karma
 * @param {Object} options
 * @param {Function} [done]
 * @returns {void}
 */
function karma (options, done) {
    // TODO Upstream: Circumvent 30 second wait
    // https://github.com/karma-runner/karma/issues/1788
    // TODO Upstream: Error: task completion callback called too many times
    // https://github.com/karma-runner/gulp-karma/issues/22
    let server = new Server(Object.assign({configFile: `${__dirname}/karma.conf.js`}, options));
    if (done) {
        server = server
            .on('browser_error', (browser, error) => done(error))
            .on('run_complete', (browsers, results) => done(results.error ? 'There are test failures' : null));
    }
    server.start();
}

/**
 * Bump the package.json version
 * @param {string} type
 * @returns {Pipe}
 */
function bump (type) {
    return gulp.src(['./package.json'])
        .pipe($.bump({type}))
        .pipe(gulp.dest('./'));
}

// ESLint Task
gulp.task('eslint', () =>
    gulp.src(['gulpfile.babel.js', 'karma.conf.js', 'webpack.config.js', '{lib,debug}/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError()));

// TSLint Task
gulp.task('tslint', () =>
    gulp.src(['{src,lib}/**/*.ts'])
        .pipe($.tslint({program: Linter.createProgram('./tsconfig.json'), formatter: 'verbose'}))
        .pipe($.tslint.report()));

// Stylelint Task
gulp.task('stylelint', () =>
    gulp.src(['src/**/*.{css,scss,less}'])
        .pipe($.stylelint({failAfterError: true, reporters: [{formatter: stylelintFormatterPretty, console: true}]})));

// Docs Task
gulp.task('docs', (cb) => {
    // No return - Error: task completion callback called too many times
    // https://github.com/SBoudrias/gulp-istanbul/issues/22
    gulp.src(['README.md', './lib/**/*.ts'], {read: false})
        .pipe($.jsdoc3(jsdocConfig, cb));
});

// Build Task
gulp.task('build',
    webpackBuild.bind(this, webpackConfig.build, 'dist/'));

// Uglify Task
gulp.task('uglify',
    webpackBuild.bind(this, webpackConfig.uglify, 'dist/'));

// Karma Task
gulp.task('karma',
    karma.bind(this, {}));

// Karma Debug Task
gulp.task('karma-debug',
    karma.bind(this, {
        reporters: ['spec', 'kjhtml'],
        autoWatch: true,
        singleRun: false
    }, null));

// Coverage Task
gulp.task('karma-coverage',
    karma.bind(this, {
        reporters: ['spec', 'coverage', 'remap-coverage'],
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            text: null,
            lcovonly: 'coverage/lcov',
            html: 'coverage/html'
        }
    }));

// Server Task
gulp.task('server', () =>
    new WebpackDevServer(webpack(webpackConfig.debug), {
        // Disable the host check, we'll never use this server for production.
        // https://github.com/webpack/webpack-dev-server/issues/882
        disableHostCheck: true,
        // Reduce logging for dev server
        // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35#issuecomment-176689891
        stats: {
            assets: false,
            children: false,
            chunkModules: false,
            chunks: false,
            colors: true,
            hash: false,
            modules: false,
            timings: false,
            version: false
        }
    }).listen(debugPort, debugHost, (error) => {
        if (error) {
            throw new $.util.PluginError('webpack-dev-server', error);
        }
        open(`http://${debugHost}:${debugPort}/webpack-dev-server/`);
    }));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('lint', ['eslint', 'tslint', 'stylelint']);
gulp.task('default', ['lint', 'build', 'uglify']);
gulp.task('test', ['karma-coverage']);
