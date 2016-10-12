define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/models/Question',
    'socket',
    'templates'
], function(_, Backbone, QuestionsView, QuestionModel, socket, JST) {
    'use strict';

    var QUESTION_LENGTH_LIMIT = 123;

    return Backbone.View.extend({
        template: JST['app/templates/question-form.hbs'],
        events: {
            'submit': 'handleSubmit',
            'keyup #question-textarea': 'updateCounter'
        },

        handleSubmit: function(evt) {
            evt.preventDefault();

            if(!this.isLogin()) {
                this.login();
            } else {
                this.save();
            }
        },

        save: function() {
            var question = this.$('#question-textarea').val();
            var questionWithName = localStorage.userName + ': ' + question;

            this.model.set('question', questionWithName);
            socket.emit('question:new', this.model.attributes);
            this.$('#question-textarea').val('');

            this.$('#counter').html(0);
            this.$('#counter').parent().removeClass('alert-color');
        },

        login: function() {
            var username = this.$('#username').val();
            
            if(!username || username.length < 3) {
                console.log('TODO write a alert');
                return;
            }

            localStorage.setItem('userName', username);
            this.render();
        },

        updateCounter: function(evt) {
            var count = evt.target.value.length;

            if(count > QUESTION_LENGTH_LIMIT) {
                this.$('#counter').parent().addClass('alert-color');
            } else {
                this.$('#counter').parent().removeClass('alert-color');
            }

            this.$('#counter').html(count);
        },

        isLogin: function() {
            return localStorage.getItem('userName') ? true : false;
        },

        render: function() {
            this.$el.html(this.template({isLogin: this.isLogin()}));
            this.delegateEvents();
            return this;
        }
    });
});
