define([
    'underscore',
    'backbone',
    'text!../../../../templates/questions-section.tpl.html',
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/views/QuestionForm'
], function(_, Backbone, QuestionsTemplate, QuestionModel, QuestionsCollection, QuestionsView, QuestionForm) {
    'use strict';

    return Backbone.View.extend({

        el: $('.contentWrapper'),

        template: _.template(QuestionsTemplate),

        render: function() {
            this.$el.html(this.template({}));

            var questionsView = new QuestionsView({ el: $('#questions > .listing'), collection: new QuestionsCollection });
            questionsView.render();

            new QuestionForm({
                model: new QuestionModel,
                el: $('#addQuestionForm')
            });

            return this;
        }
    });
});