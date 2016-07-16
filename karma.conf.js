import {spec} from './webpack';

export default function (config) {
    config.set({
        browsers: [
            'PhantomJS'
        ],
        singleRun: true,
        frameworks: [
            'mocha'
        ],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'spec/**/*.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            'spec/**/*.js': ['webpack']
        },
        reporters: [
            'mocha',
            'coverage'
        ],
        webpack: spec,
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcovonly', subdir: '.'}
            ]
        }
    });
}
