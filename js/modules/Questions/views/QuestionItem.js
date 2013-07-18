define([
    'underscore',
    'backbone',
    'text!/templates/question.tpl.html'
], function(_, Backbone, QuestionTemplate) {
    'use strict';

    return Backbone.View.extend({

        template: _.template(QuestionTemplate),

        render: function() {
            var highlightedClass = this.options.highlighted ? ' highlighted' : '';
            this.$el
                .attr('id', 'question-' + this.model.id)
                .addClass('questionItem' + highlightedClass)
                .html(this.template(this.model));
            return this;
        }
    });
});
