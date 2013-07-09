define([
    'jquery',
    'underscore',
    'backbone',
    'views/AppView',
    'modules/Schedule/router'
], function($, _, Backbone, AppView, ScheduleRouter) {

        var initialize = function() {
             var appView = new AppView();
             ScheduleRouter.initialize();

             var $window = $(window);
             $window.on('resize.app', function() {
                ScheduleRouter.adjustOnResize( {width: $window.width()} );
            });
        };

        return {
            initialize: initialize
        };
    }
);
