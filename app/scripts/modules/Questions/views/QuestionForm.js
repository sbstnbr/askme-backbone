define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionsListing'
], function(_, Backbone, QuestionsView) {
    'use strict';

    return Backbone.View.extend({

        events: {
            submit: 'save'
        },

        save: function(evt) {
            evt.preventDefault();
            this.model.save(
                {
                    action: 'save',
                    question: this.$('input[name=question]').val()
                },
                {
                    success: function(model, response, options) {
                        var questionsView = new QuestionsView({ el: $('#questions > .listing') });
                        model.attributes.votes = 0;
                        questionsView.addOne(model, true);
                        $('html, body').animate({ scrollTop: $(document).height() }, 250);
                        $('#question-' + model.id).removeClass('highlighted');
                    },
                    error: function(model, xhr, options) {
                        console.log('Error saving question');
                    }
                }
            );
        }
    });
});