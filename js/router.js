define([
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'modules/Schedule/controller'
], function(_, Backbone, AppView, IndexView, ScheduleController) {
    'use strict';

    var initialize = function() {

        var appView = new AppView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function(actions) {
                (new IndexView()).render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
