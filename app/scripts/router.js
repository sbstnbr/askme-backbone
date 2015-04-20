define([
    'underscore',
    'backbone',
    'modules/Questions/views/Questions'
], function(
    _, 
    Backbone, 
    QuestionsView
){
    'use strict';

    var initialize = function() {

        var questionsView = new QuestionsView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function(actions) {
                questionsView.render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
