requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        modernizr: '../vendor/custom.modernizr',
        jquery: '../vendor/jquery',
        'jquery-ui': '../vendor/jquery-ui.custom',
        foundation: '../foundation/foundation',
        underscore: '../vendor/underscore',
        backbone: '../vendor/backbone',
        localStorage: '../vendor/backbone.localStorage',
        fullcalendar: '../vendor/fullcalendar'
    },
    shim: {
        modernizr: {
            exports: 'Modernizr'
        },
        jquery: {
            exports: '$'
        },
        'jquery-ui': {
            deps: ['jquery']
        },        
        underscore: {
            exports: '_'
        },
        foundation: {
            deps: ['jquery']
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        localStorage: {
            deps: ['backbone']
        },
        fullcalendar: {
            deps: ['jquery']
        }
    }
});

require(['App'], function (App) {
    App.init();
});
