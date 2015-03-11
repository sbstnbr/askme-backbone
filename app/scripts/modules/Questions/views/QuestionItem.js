define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/question.hbs'],

        render: function() {
            var highlightedClass = this.options.highlighted ? ' highlighted' : '';
            this.$el
                .attr('id', 'question-' + this.model.id)
                .addClass('panel callout radius row questionItem' + highlightedClass)
                .html(this.template(this.model.attributes));
            return this;
        },

        events: {
            'click button.votePositive' : 'addOneVote'
        },

        addOneVote: function(evt) {
            var id = $(evt.currentTarget).data("id");
            this.model.set('votes', this.model.get('votes') + 1);
            this.model.save(null,
                {
                    success: function(model, response, options) {
                        $('#question-' + response.id + ' .votes > .count').html(response.votes);
                    },
                    error: function(model, xhr, options) {
                        console.log('Error on voting');
                    }
                }
            );
        }
    });
});
