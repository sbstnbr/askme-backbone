define([
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'views/SocialView',
    'modules/Schedule/controller',
    'modules/Questions/controller'
], function(_, Backbone, AppView, IndexView, SocialView, ScheduleController, QuestionsController) {
    'use strict';

    var initialize = function() {

        var appView = new AppView;
        var indexView = new IndexView;
        var socialView = new SocialView;

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'schedule(/)': 'schedules',
                'questions(/)': 'questions',
                'social(/)': 'social',
                '(*actions)(/)': 'defaultAction'
            },

            schedules: function() {
                indexView.render();
                indexView.showOnlySchedule();
            },

            questions: function() {
                QuestionsController.initialize();
            },

            defaultAction: function(actions) {
                indexView.render();
            },

            social: function() {
                socialView.render();
            }

        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
