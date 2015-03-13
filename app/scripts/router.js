define([
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'views/SocialView',
    'modules/Schedule/controller',
    'modules/Questions/controller',
    'modules/Nominate/controller',
], function(_, Backbone, AppView, IndexView, SocialView, ScheduleController, QuestionsController, NominateController) {
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
                'nominate(/)':'nominate',
                'nominate/{id}(/)': 'nominateDetail',
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
            },

            nominate: function() {
                NominateController.initialize();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
