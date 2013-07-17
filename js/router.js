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

        var appView = new AppView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'questions(/)': 'questions',
                '(*actions)(/)': 'defaultAction'
            },

            questions: function() {
                QuestionsController.initialize();
            },

            defaultAction: function(actions) {
                (new IndexView).render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
