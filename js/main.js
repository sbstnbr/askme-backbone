require.config({
    paths: {
        text: 'vendor/text',
        modernizr: 'vendor/custom.modernizr',
        jquery: 'vendor/jquery',
        'jquery-ui': 'vendor/jquery-ui.custom',
        foundation: 'foundation/foundation',
        'foundation.reveal': 'foundation/foundation.reveal',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        fullcalendar: 'vendor/fullcalendar',
        breakpoints: 'lib/breakpoints'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        foundation: {
            deps: ['jquery']
        },
        'foundation.reveal': {
            deps: ['foundation']
        },
        fullcalendar: {
            deps: ['jquery', 'jquery-ui']
        }
    }
});

require(['app'], function (App) {
    'use strict';

    App.initialize();
});
