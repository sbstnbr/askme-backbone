require.config({
    paths: {
        modernizr: 'vendor/custom.modernizr',
        jquery: 'vendor/jquery',
        'jquery-ui': 'vendor/jquery-ui.custom',
        foundation: 'foundation/foundation',
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
        foundation: {
            deps: ['jquery']
        },
        fullcalendar: {
            deps: ['jquery', 'jquery-ui']
        },
        'jquery-ui': {
            deps: ['jquery']
        }
    }
});

require(['app'], function (App) {
    App.initialize();
});
