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
                    question: this.$('input[name=question]').val()
                },
                {
                    success: function(model, response, options) {
                        var model = {
                            id: response.id,
                            question: model.attributes.question,
                            votes: 0
                        };
                        // display added model
                    },
                    error: function(model, xhr, options) {
                        console.log('Error saving question');
                    }
                }
            );
        }
    });
});