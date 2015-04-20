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
            this.questionsView = new QuestionsView({ 
                el: $('#new-questions'), 
                collection: new QuestionsCollection 
            });
            this.questionsView.collection.comparator = function(model) {
                return model.get('id');
            };

            this.topQuestionsView = new QuestionsView({
                el: $('#top-questions'),
                collection: new QuestionsCollection
            });
            this.topQuestionsView.collection.comparator = function(model) {
                return model.get('votes');
            };

            this.questionsView.listenTo(this.questionsView.collection, 'add', function(model) {
                that.questionsView.render();
                that.topQuestionsView.render();
                that.$el.find('#nr-of-questions').text(that.questionsView.collection.length);
            });

            this.questionsView.listenTo(this.questionsView.collection, 'reset', function() {
               that.$el.find('#nr-of-questions').text(that.questionsView.collection.length); 
            });

            this.topQuestionsView.listenTo(this.topQuestionsView.collection, 'sort', function() {
                that.topQuestionsView.render();
            });
        },
        render: function() {
            this.$el.html(this.template({}));
            this.questionsView.$el = this.$('#new-questions');
            this.topQuestionsView.$el = this.$('#top-questions');
            
            this.questionsView.render();
            this.topQuestionsView.render();

            new QuestionForm({
                model: new QuestionModel,
                el: $('#addQuestionForm')
            });

            return this;
        }
    });
});
