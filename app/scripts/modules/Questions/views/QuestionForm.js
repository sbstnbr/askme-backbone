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
            submit: 'save'
        },
        save: function(evt) {
            evt.preventDefault();
            this.model.set('question',this.$('input[name=question]').val());
            socket.emit('question:new', this.model.attributes);
            this.$('input[name=question]').val('');
        }
    });
});
