define([
    'underscore',
    'backbone',
    'modules/Questions/views/QuestionItem'
], function(_, Backbone, QuestionItemView) {
    'use strict';

    return Backbone.View.extend({

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

            return this;
        },
        addOne: function(model, highlighted) {

            highlighted || (highlighted = false);
            var questionItemView = new QuestionItemView({ model: model, highlighted: highlighted });
            this.$el.append(questionItemView.render().$el);

            return this;
        }
    });
});