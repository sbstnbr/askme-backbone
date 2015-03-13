define([
    'underscore',
    'backbone',
    'modules/Nominate/views/PresenterItem'
], function(_, Backbone,PresenterItemView) {
    'use strict';

    return Backbone.View.extend({

        render: function() {
            var that = this;
            this.collection.fetch({
                reset: true,
                success: function(collection, response, options) {
                    that.addAll(collection.models);
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

        addOne: function(model) {
            var presenterItemView = new PresenterItemView({ model: model});
            this.$el.append(presenterItemView.render().$el);
                        
            return this;
        }
    });
});
