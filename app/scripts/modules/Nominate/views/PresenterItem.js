define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        events: {
            'click .show-detail': 'triggerDetail'
        },

        template: JST['app/templates/presenter.hbs'],
        
        render: function() {
            this.$el
                .attr('id', 'presenter-' + this.model.id)
                .addClass('panel callout radius row presenterItem')
                .html(this.template(this.model.attributes));
            return this;
        },

        triggerDetail: function() {
            Backbone.trigger('PresenterItem:show-detail', this.model);
        }
    });
});
