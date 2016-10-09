import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import open from 'open';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import {Server} from 'karma';
import * as webpackConfig from './webpack';
import jsdocConfig from './jsdoc.json';

const $ = gulpLoadPlugins();

const wpack = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts))
        .pipe(gulp.dest(dest));

const karma = (done, options = {}) => {
    const server = new Server(Object.assign({configFile: `${__dirname}/karma.conf.js`}, options));
    // TODO Circumvent 30 second wait
    // https://github.com/karma-runner/karma/issues/1788
    server.on('run_complete', (browsers, results) =>
        done(results.error ? 'There are test failures' : null));
    server.start();
};

const bump = type =>
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({type}))
        .pipe(gulp.dest('./'));

// Lint Task
gulp.task('lint', () =>
    gulp.src(['gulpfile.babel.js', 'index.js', 'webpack.js', '{lib,test}/**/*.js'])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError()));

// Docs Task
gulp.task('docs', (cb) => {
    // No return - Error: task completion callback called too many times
    // https://github.com/SBoudrias/gulp-istanbul/issues/22
    gulp.src(['README.md', './lib/**/*.js'], {read: false})
        .pipe($.jsdoc3(jsdocConfig, cb));
});

// Build Task
gulp.task('build', ['lint'],
    wpack.bind(this, 'index.js', webpackConfig.build, 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'],
    wpack.bind(this, 'index.js', webpackConfig.uglify, 'dist/'));

// Test Task
gulp.task('karma', ['lint'], done =>
    karma(done));

// Karma Task
gulp.task('karma-debug', ['lint'], done =>
    karma(done, {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
    }));

// Coverage Task
gulp.task('coverage', ['lint'], (done) => {
    process.env.NODE_ENV = 'coverage'; // Triggers babel-plugin-istanbul
    return karma(done, {
        webpack: webpackConfig.build,
        reporters: ['mocha', 'coverage']
    });
});

// Coveralls Task
gulp.task('codecov', ['coverage'], () =>
    gulp.src('coverage/lcov.info')
        .pipe($.codecov({token: '741939b3-cc23-47a2-89e8-3c9b8b82d1ba'})));

// Server Task
gulp.task('server', () =>
    new WebpackDevServer(webpack(webpackConfig.debug), {
        publicPath: `/${webpackConfig.debug.output.publicPath}`,
        stats: {colors: true},
        historyApiFallback: {index: `/${webpackConfig.debug.output.publicPath}`}
    }).listen(3000, 'localhost', (err) => {
        if (err) {
            throw new $.util.PluginError('webpack-dev-server', err);
        }
        open(`http://localhost:3000/webpack-dev-server/${webpackConfig.debug.output.publicPath}`);
    }));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);
