define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/presentations.hbs'],
        
        render: function() {
            this.$el
                .attr('id', 'presentations-' + this.model.id)
                .addClass('panel callout radius row finalistItem')
                .html(this.template(this.model.attributes));
            return this;
        }
    });
});
