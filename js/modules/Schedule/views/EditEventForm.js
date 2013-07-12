define([
    'underscore',
    'backbone',
    'text!/templates/edit-event.tpl.html'
], function(_, Backbone, EditEventTemplate) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),

        template: _.template(EditEventTemplate),

        render: function() {
            this.$el.html(this.template(this.model));
            return this;
        }
    });
});
