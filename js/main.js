require.config({
    paths: {
        modernizr: 'vendor/custom.modernizr',
        jquery: 'vendor/jquery',
        'jquery-ui': 'vendor/jquery-ui.custom',
        foundation: 'foundation/foundation',
        underscore: 'vendor/underscore',
        backbone: 'vendor/backbone',
        localStorage: 'vendor/backbone.localStorage',
        fullcalendar: 'vendor/fullcalendar'
    },

    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        foundation: {
            exports: 'Foundation'
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
