define([
    'underscore',
    'backbone',
    'templates',
    'socket'
], function(_, Backbone, JST, socket) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/question.hbs'],
        initialize: function() {
            this.listenTo(this.model, 'change', function() {
                console.log('Model changed');
                this.render();
            });
        },
        render: function() {
            var highlightedClass = this.options.highlighted ? ' highlighted' : '';
            this.$el
                .attr('id', 'question-' + this.model.id)
                .addClass('panel callout radius row questionItem' + highlightedClass)
                .html(this.template(this.model.attributes));
            return this;
        },

        events: {
            'click button.votePositive' : 'addOneVote',
            'click button.voteNegative' : 'removeOneVote',
        },

        addOneVote: function() {
            socket.emit('vote', {id: this.model.get('id'), uuid: localStorage.getItem('uuid')});
        },

        removeOneVote: function () {
            socket.emit('downvote', {id: this.model.get('id'), uuid: localStorage.getItem('uuid')});
        }

    });
});
