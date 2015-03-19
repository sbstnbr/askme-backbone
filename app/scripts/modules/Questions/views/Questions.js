define([
    'underscore',
    'backbone',
    'templates',
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions',
    'modules/Questions/views/QuestionsListing',
    'modules/Questions/views/QuestionForm'
], function(_, Backbone, JST, QuestionModel, QuestionsCollection, QuestionsView, QuestionForm) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),
        template: JST['app/templates/questions-section.hbs'],
        initialize: function() {
            var that = this;
            this.questionsView = new QuestionsView({ el: $('#questions > .listing'), collection: new QuestionsCollection });
            this.questionsView.listenTo(this.questionsView.collection, 'add', function(model) {
                that.questionsView.render();
            });
        },
        render: function() {
            this.$el.html(this.template({}));
            this.questionsView.$el = this.$('#questions > .listing');
            this.questionsView.render();
            new QuestionForm({
                model: new QuestionModel,
                el: $('#addQuestionForm')
            });

            return this;
        }
    });
});
