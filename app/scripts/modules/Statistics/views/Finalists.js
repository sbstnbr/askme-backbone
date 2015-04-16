define([
    'underscore',
    'backbone',
    'modules/Statistics/collections/Finalists',
    'modules/Statistics/views/FinalistItem'
], function(_, Backbone,FinalistsCollection, FinalistItemView) {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            this.collection = new FinalistsCollection({});
        },

        el: $('.contentWrapper'),    

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
            var finalistItemView = new FinalistItemView({ model: model});
            this.$el.append(finalistItemView.render().$el);
                        
            return this;
        }
    });
});
