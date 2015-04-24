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

        new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function() {
                questionsView.render();

                if(!localStorage.userName) {
                    var userName = prompt('Please enter your name.', 'No name') || 'No name';
                    localStorage.setItem('userName', userName);
                }
            }
        }))();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
