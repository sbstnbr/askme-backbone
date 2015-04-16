define([
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'views/SocialView',
    'modules/Questions/views/Questions',
    'modules/Schedule/controller',
    'modules/Questions/controller',
    'modules/Nominate/controller',
    'modules/Statistics/views/Finalists',
    'modules/Statistics/views/Presentations'
], function(
    _, 
    Backbone, 
    AppView, 
    IndexView, 
    SocialView, 
    QuestionsView, 
    ScheduleController, 
    QuestionsController, 
    NominateController, 
    FinalistsView,
    PresentationsView
){
    'use strict';

    var initialize = function() {

        var appView = new AppView;
        var indexView = new IndexView;
        var socialView = new SocialView;
        var finalistsView = new FinalistsView;
        var presentationsView = new PresentationsView;
        var questionsView = new QuestionsView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'schedule(/)': 'schedules',
                'questions(/)': 'questions',
                'social(/)': 'social',
                'nominate(/)': 'nominate',
                'nominate/{id}(/)': 'nominateDetail',
                'finalists(/)': 'finalist',
                'presentations(/)': 'presentations',
                '(*actions)(/)': 'defaultAction'
            },

            schedules: function() {
                indexView.render();
                indexView.showOnlySchedule();
            },

            questions: function() {
                questionsView.render();
            },

            defaultAction: function(actions) {
                indexView.render();
            },

            social: function() {
                socialView.render();
            },

            nominate: function() {
                NominateController.initialize();
            },

            finalist: function() {
                finalistsView.render();
            },

            presentations: function() {
                presentationsView.render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
