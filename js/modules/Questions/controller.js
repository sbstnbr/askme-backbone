define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Questions/models/Question',
    'modules/Questions/collections/Questions',
    'modules/Questions/views/Questions',
    'modules/Questions/views/QuestionForm'
], function($, _, Backbone, QuestionModel, QuestionsCollection, QuestionsView, QuestionForm) {
    'use strict';

    var questions = new QuestionsCollection();
    var questionsView = null;

    var initialize = function() {
        questionsView = new QuestionsView({ el: $('#questions > .listing'), collection: questions });
        questionsView.render();

        new QuestionForm({
            model: new QuestionModel,
            el: $('#addQuestionForm')
        });
    };

    return {
        initialize: initialize
    }
});