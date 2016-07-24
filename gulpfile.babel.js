import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpackStream from 'webpack-stream';
import {Server} from 'karma';
import * as wpack from './webpack';

const $ = gulpLoadPlugins();

const webpack = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts))
        .pipe(gulp.dest(dest));

const test = (done, options = {}) => {
    const server = new Server(Object.assign({configFile: `${__dirname}/karma.conf.js`}, options));
    // TODO Circumvent 30 second wait
    // https://github.com/karma-runner/karma/issues/1788
    server.on('run_complete', (browsers, results) =>
        done(results.error ? 'There are test failures' : null));
    server.start();
};

const bump = type =>
    gulp.src([
        './bower.json',
        './package.json'
    ])
    .pipe($.bump({type}))
    .pipe(gulp.dest('./'));

// Lint Task
gulp.task('lint', () =>
    gulp.src([
        'gulpfile.babel.js',
        'index.js',
        'webpack.js',
        '{lib,test}/**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError()));

// Build Task
gulp.task('build', ['lint'],
    webpack.bind(this, 'index.js', wpack.build, 'dist/'));

// Uglify Task
gulp.task('uglify', ['lint'],
    webpack.bind(this, 'index.js', wpack.uglify, 'dist/'));

// Test Task
gulp.task('test', ['lint'], (done) =>
    test(done));

// Coverage Task
gulp.task('coverage', ['lint'], (done) =>
    test(done, {webpack: wpack.coverage}));

// Coveralls Task
gulp.task('coveralls', ['coverage'], () =>
    gulp.src('coverage/lcov.info')
        .pipe($.coveralls()));

// Server Task
gulp.task('server', ['lint'], (done) =>
    test(done, {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
    }));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);
