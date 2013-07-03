requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        modernizr: '../vendor/custom.modernizr',
        zepto: '../vendor/zepto',
        foundation: '../foundation/foundation',
        underscore: '../vendor/underscore',
        backbone: '../vendor/backbone',
        localStorage: '../vendor/backbone.localStorage'
    },
    shim: {
        modernizr: {
            exports: 'Modernizr'
        },
        zepto: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        foundation: {
            deps: ['zepto']
        },
        backbone: {
            deps: ['zepto', 'underscore'],
            exports: 'Backbone'
        },
        localStorage: {
            deps: ['backbone']
        }
    }
});

require(
    ['foundation', 'App'],
    function (foundation, App) {
        $(document).foundation();
        App.init();
    }
);
