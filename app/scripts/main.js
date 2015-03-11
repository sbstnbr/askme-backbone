require.config({
    paths: {
        text: '../bower_components/requirejs-text/text',
        modernizr: '../bower_components/modernizr/modernizr',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        fullcalendar: '../bower_components/fullcalendar/fullcalendar',
        breakpoints: 'lib/breakpoints',
        handlebars: 'vendor/handlebars',
        handlebarsHelpers: 'lib/handlebarsHelpers',
        requirejs: '../bower_components/requirejs/require',
        foundation: '../bower_components/foundation/js/foundation'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'jquery',
                'underscore'
            ],
            exports: 'Backbone'
        },
        fullcalendar: {
            deps: [
                'jquery'
            ]
        }
    }
});

require(['app'], function (App) {
    'use strict';

    App.initialize();
});
