define([
    'underscore',
    'backbone',
    'text!/templates/question.tpl.html'
], function(_, Backbone, QuestionTemplate) {
    'use strict';

    return Backbone.View.extend({

        el: $('#questions listing'),

        template: _.template(QuestionTemplate),

        render: function() {
            var that = this;
            this.collection.fetch({
                reset: true,
                success: function(model, response, options) {
                    that.addAll(model.toJSON());
                },
                error : function(model, response, options) {
                    console.log('Error loading questions from server');
                }
            });
        },

        addAll: function(collection) {
            this.$el.html('');
            _.each(collection, function(model) {
                this.addOne(model);
            }, this);
        },

        addOne: function(model) {
            this.$el.append(this.template(model));
        }
    });
});