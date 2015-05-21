define([
    'underscore',
    'backbone',
    'modules/Questions/models/Rating',
    'modules/Questions/views/RatingView'
], function(_, Backbone, RatingModel, RatingItemView) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            var that = this;
            this.collection.fetch({
                 reset: true,
                 success: function(collection) {
                     that.addAll(collection.models);
                 },
                 error : function() {
                     console.log('Error loading questions from server');
                 }
            });
            //this.addAll(this.collection.models);
        },

        addAll: function(collection) {
            this.$el.html('');
            _.each(collection, function(model) {
                this.addOne(model);
            }, this);
            return this;
        },

        addOne: function(model, highlighted) {
            var ratingItemView = new RatingItemView({ model: model });
            this.$el.prepend(ratingItemView.render().$el);

            return this;
        }
    });
});
