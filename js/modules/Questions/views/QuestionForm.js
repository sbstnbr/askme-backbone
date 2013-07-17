define([
    'underscore',
    'backbone'
], function(_, Backbone) {
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
                    success: function() {
                        console.log('saved successfully');
                    },
                    error: function() {
                        console.log('Error saving question');
                    }
                }
            );
        }
    });
});