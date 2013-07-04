define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Schedule/router'
], function($, _, Backbone, ScheduleRouter) {

        var initialize = function() {
             ScheduleRouter.initialize();
        };

        return {
            initialize: initialize
        };
    }
);
