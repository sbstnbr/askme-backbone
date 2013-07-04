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
        }
    }
});

require(['app'], function (App) {
    App.initialize();
});
