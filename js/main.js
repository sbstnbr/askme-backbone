require.config({
    paths: {
        text: 'vendor/text',
        modernizr: 'vendor/custom.modernizr',
        jquery: 'vendor/jquery',
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
        }
    }
});

require(['app'], function (App) {
    'use strict';

    App.initialize();
});
