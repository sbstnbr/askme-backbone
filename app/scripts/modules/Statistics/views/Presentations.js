define([
    'underscore',
    'backbone',
    'modules/Statistics/collections/Presentations',
    'modules/Statistics/views/PresentationItem'
], function(_, Backbone,PresentationsCollection, PresentationItemView) {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            this.collection = new PresentationsCollection({});
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
            var presentationItemView = new PresentationItemView({ model: model});
            this.$el.append(presentationItemView.render().$el);
                        
            return this;
        }
    });
});
