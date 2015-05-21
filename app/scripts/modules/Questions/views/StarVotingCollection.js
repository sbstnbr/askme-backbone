define([
    'underscore',
    'backbone',
    'modules/Questions/models/StarVoting',
    'modules/Questions/views/StarVotingItem'
], function(_, Backbone, StarVotingModel, StarVotingItemView) {
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
        },

        addAll: function(collection) {
            this.$el.html('');
            _.each(collection, function(model) {
                this.addOne(model);
            }, this);
            return this;
        },

        addOne: function(model, highlighted) {
            var starVotingItemView = new StarVotingItemView({ model: model });
            this.$el.prepend(starVotingItemView.render().$el);

            return this;
        }
    });
});
