define([
    'underscore',
    'backbone',
    'text!/templates/question.tpl.html'
], function(_, Backbone, QuestionTemplate) {
    'use strict';

    return Backbone.View.extend({

        el: $('#questions listing'),

        template: _.template(QuestionTemplate),

        initialize: function() {
            var that = this;
            this.collection.fetch({
                reset: true,
                success: function(model, response, options) {
                    that.render(model.toJSON());
                },
                error : function(model, response, options) {
                    console.log('Error loading questions from server');
                }
            });
        },

        render: function(json) {
            json || (json = []);
            this.$el.html('');
            _.each(json, function(questionEntry, i) {
                this.$el.append(this.template(questionEntry));
            }, this);
        }
    });
});