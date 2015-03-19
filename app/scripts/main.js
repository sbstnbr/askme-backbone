require.config({
    paths: {
        text: '../bower_components/requirejs-text/text',
        modernizr: '../bower_components/modernizr/modernizr',
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        fullcalendar: '../bower_components/fullcalendar/fullcalendar',
        breakpoints: 'lib/breakpoints',
        handlebars: '../bower_components/handlebars/handlebars',
        handlebarsHelpers: 'lib/handlebarsHelpers',
        foundation: '../bower_components/foundation/js/foundation',
        fastclick: '../bower_components/foundation/js/vendor/fastclick',
        requirejs: '../bower_components/requirejs/require',
        'socket.io': '../bower_components/sio-client/socket.io',
        'lil-uuid':'../bower_components/lil-uuid/uuid'

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
            deps: ['jquery']
        },
        foundation: {
            deps: ['jquery', 'fastclick']
        }
    }
});

require(['app', 'foundation'], function (App) {
    'use strict';

    App.initialize();
    $(document).foundation();
});
