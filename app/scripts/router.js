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
        new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function() {
                var questionsView = new QuestionsView();
                questionsView.render();
            }
        }))();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
