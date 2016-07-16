import {spec} from './webpack';

export default function (config) {
    config.set({
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'spec/**/*.js'
        ],
        plugins: [
            'karma-chai',
            'karma-coverage',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],
        browsers: [
            'PhantomJS'
        ],
        singleRun: true,
        frameworks: [
            'mocha'
        ],
        preprocessors: {
            'spec/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: spec,
        webpackServer: {
            noInfo: true
        },
        reporters: [
            'mocha',
            'coverage'
        ],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcovonly', subdir: '.'}
            ]
        }
    });
}
