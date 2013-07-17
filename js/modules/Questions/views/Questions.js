define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            this.collection.fetch({
                reset: true,
                success: function(model, response, options) {
                    var json = model.toJSON();
                },
                error : function(model, response, options) {
                    console.log('Error loading questions from server');
                }
            });
        },

        render: function() {
            this.$el.html('These are questions');
        }
    });
});