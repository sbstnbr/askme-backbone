define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/finalist.hbs'],
        
        render: function() {
            this.$el
                .attr('id', 'finalist-' + this.model.id)
                .addClass('panel callout radius row finalistItem')
                .html(this.template(this.model.attributes));
            return this;
        }
    });
});
