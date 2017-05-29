import {karma} from './webpack';

export default function (config) {
    config.set({
        files: [
            'spec/index.js'
        ],
        browsers: [
            'ChromeHeadless'
        ],
        singleRun: true,
        frameworks: [
            'jasmine'
        ],
        preprocessors: {
            'spec/index.js': ['webpack', 'sourcemap']
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
