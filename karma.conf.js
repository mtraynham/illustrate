import {karma} from './webpack.config';

/**
 * Simple webpack karma build
 * @param {Karma.Configuration} config
 * @returns {void}
 */
export default function (config) {
    config.set({
        files: [
            // Load our root test module
            './index.spec.ts'
        ],
        browsers: [
            'ChromeHeadless'
        ],
        singleRun: true,
        frameworks: [
            'jasmine'
        ],
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        preprocessors: {
            './index.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: karma,
        webpackServer: {
            noInfo: true
        },
        reporters: [
            'spec'
        ]
    });
}
