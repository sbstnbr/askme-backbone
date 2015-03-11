define([
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'modules/Schedule/controller',
    'modules/Questions/controller'
], function(_, Backbone, AppView, IndexView, ScheduleController, QuestionsController) {
    'use strict';

    var initialize = function() {

        var appView = new AppView;
        var indexView = new IndexView;

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'schedule(/)': 'schedules',
                'questions(/)': 'questions',
                '(*actions)(/)': 'defaultAction'
            },

            schedules: function() {
                indexView.showOnlySchedule();
            },

            questions: function() {
                QuestionsController.initialize();
            },

            defaultAction: function(actions) {
                indexView.render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
