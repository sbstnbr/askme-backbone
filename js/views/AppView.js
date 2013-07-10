define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.View.extend({
        el: document.body,

        initialize: function() {
            $(window).bind('resize.app', _.bind(this.$el.resize, this));
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});