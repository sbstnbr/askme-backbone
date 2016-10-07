define([
    'underscore',
    'backbone',
    'modules/Questions/views/Questions',
    'modules/Questions/views/LoginForm'
], function(
    _,
    Backbone,
    QuestionsView,
    LoginFormView
){
    'use strict';

    var initialize = function() {
        
        var loginFormView = new LoginFormView();

        new (Backbone.Router.extend({
            routes: {
                '(*actions)(/)': 'defaultAction'
            },

            defaultAction: function() {
                if(!localStorage.getItem('userName')) {
                    console.log('rendering form');
                    loginFormView.render();

                    return;
                }

                console.log('rendering questions');
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
