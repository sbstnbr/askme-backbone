define([
    'underscore',
    'backbone',
    'templates',
    './Questions'
], function(_, Backbone, JST, QuestionsView) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),
        template: JST['app/templates/login.hbs'],
        events: {
            submit: 'submit'
        },

        submit: function(evt) {
            evt.preventDefault();
            var username = this.$('#username').val();
            
            if(!username || username.length < 3) {
                console.log('TODO write a alert');
                return;
            }

            localStorage.setItem('userName', username);

            var questionsView = new QuestionsView();
            questionsView.render();
        },

        render: function() {
            return this.$el.html(this.template({}));
        }
    });
});
