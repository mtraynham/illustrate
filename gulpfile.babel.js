import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {Instrumenter} from 'isparta';
import webpackStream from 'webpack-stream';
import * as wpack from './webpack';

const $ = gulpLoadPlugins();

const webpack = (src, opts, dest) =>
    gulp.src(src)
        .pipe(webpackStream(opts))
        .pipe(gulp.dest(dest));

const test = () =>
    webpack(['spec/*.js'], wpack.spec, '.tmp/')
        .pipe($.jasmineBrowser.specRunner({console: true}))
        .pipe($.jasmineBrowser.headless());

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
gulp.task('test', ['lint'],
    test.bind(this));

// Coverage Task
gulp.task('coverage', ['lint'], () =>
    gulp.src(['lib/**/*.js'])
        .pipe($.istanbul({instrumenter: Instrumenter}))
        .pipe($.istanbul.hookRequire())
        .on('finish', () =>
            test()
                .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', () =>
                    gulp.src('coverage/lcov.info')
                        .pipe($.coveralls()))));

gulp.task('server', () =>
    webpack(['spec/*.js'], Object.assign({}, wpack.spec, {watch: true}), '.tmp/')
        .pipe($.jasmineBrowser.specRunner())
        .pipe($.jasmineBrowser.server()));

// Bump Tasks
gulp.task('bump:major', bump.bind(this, 'major'));
gulp.task('bump:minor', bump.bind(this, 'minor'));
gulp.task('bump:patch', bump.bind(this, 'patch'));

// Default Task
gulp.task('default', ['build', 'uglify']);
