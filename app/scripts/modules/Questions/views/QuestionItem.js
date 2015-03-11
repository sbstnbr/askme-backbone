define([
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../../templates/question.hbs'
], function(_, Backbone, Handlebars, QuestionTemplate) {
    'use strict';

    return Backbone.View.extend({

        template: Handlebars.compile(QuestionTemplate),

        render: function() {
            var highlightedClass = this.options.highlighted ? ' highlighted' : '';
            this.$el
                .attr('id', 'question-' + this.model.id)
                .addClass('questionItem' + highlightedClass)
                .html(this.template(this.model.attributes));
            return this;
        },

        events: {
            'click button.votePositive' : 'addOneVote'
        },

        addOneVote: function(evt) {
            var id = $(evt.currentTarget).data("id");
            this.model.save(
                {
                    action: 'vote'
                },
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
