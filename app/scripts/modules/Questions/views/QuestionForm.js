define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/models/Question',
    'socket'
], function(_, Backbone, QuestionsView, QuestionModel, socket) {
    'use strict';
    return Backbone.View.extend({
        events: {
            submit: 'save',
            'keyup #addQuestionForm-question': 'updateCounter' 
        },
        save: function(evt) {
            evt.preventDefault();
            var question = localStorage.userName + ': ' + this.$('#addQuestionForm-question').val();
            console.log('question: ', question);
            this.model.set('question', question);
            socket.emit('question:new', this.model.attributes);
            this.$('#addQuestionForm-question').val('');
            this.$('#counter').html(0);
            this.$('#counter').parent().removeClass('alert-color');
        },
        updateCounter: function(evt) {
            var count = evt.target.value.length;
            if(count > 140) {
                this.$('#counter').parent().addClass('alert-color');
            } else {
                this.$('#counter').parent().removeClass('alert-color');
            }
            this.$('#counter').html(count);
        }
    });
});
