// Automatically run fixes
// $ stylelint --fix src/**/*.scss
// $ stylefmt -c .stylelintrc.js -r src/**/*.scss

// Has to be CommonJS...
/* eslint-disable no-var */

// Only using the `order/properties-order' rule from this guy.
// Since we are using sass, we don't want to inherit the 'stylelint-config-standard'
var stylelintConfigIdiomaticOrder = require('stylelint-config-idiomatic-order');

module.exports = {
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-sass-guidelines'
    ],
    rules: {
        indentation: 4,
        // NOTE: Overridden to support vendor class patterns,
        // adds support for underscores at the beginning
        // or explicitly 'md-THEME_NAME-theme'
        // Default: "^[a-z0-9\\-]+$"
        'selector-class-pattern': [
            `^(${
                [
                    '[_]?[a-z0-9\\-]+',
                    // List your extra vendor patterns here...
                    'md-THEME_NAME-theme',
                    'dndDragging|dndPlaceholder|dndDragover',
                    'ps__[a-z\\-]+',
                    'vAccordion--[a-z\\-]+'
                ].join('|')
            })$`,
            {
                message: 'Selector should be written in lowercase with hyphens (selector-class-pattern)'
            }
        ],
        // Add your custom tag names/prefixes here...
        'selector-type-no-unknown': [
            true,
            {
                ignoreTypes: ['/ng-/', '/md-/', '/tivo-/', '/v-pane/', 'ui-layout', 'toolbar']
            }
        ],
        // TODO: Remove - Overwritten to support material color palette -A100 endings
        // https://github.com/bjankord/stylelint-config-sass-guidelines/blob/master/index.js#L60
        // Default: "^[_]?[a-z]+([a-z0-9-]+[a-z0-9]+)?$"
        'scss/dollar-variable-pattern': /^[_]?[a-z]+([a-z0-9-]+[a-z0-9]+)?(-A\d+)?$/,

        /**
         * Ordering
         */
        // Specify the order of style objects, e.g. rules, variables, etc.
        'order/order': [
            'dollar-variables',
            'at-variables',
            // Put our sass specific at-functions at the top
            'less-mixins',
            {
                type: 'at-rule',
                name: 'mixin'
            },
            {
                type: 'at-rule',
                name: 'at-root'
            },
            {
                type: 'at-rule',
                name: 'extend'
            },
            {
                type: 'at-rule',
                name: 'include'
            },
            'declarations',
            'custom-properties',
            'rules',
            {type: 'at-rule'}
        ],
        // Specify the order of styles within a rule
        'order/properties-order': stylelintConfigIdiomaticOrder.rules['order/properties-order'],
        // Turn off alphabetical ordering, this is bad news bears.
        'order/properties-alphabetical-order': null,

        /**
         * TODO: Temporarily disabling these, too many issues to handle (mostly whitespace)
         */
        // Nesting and selection
        // These are problematic if we are shipping this as a library which
        // would be extended, but we aren't going to do that...
        'max-nesting-depth': null,
        'selector-max-compound-selectors': null,
        'selector-no-qualifying-type': null
    }
};
