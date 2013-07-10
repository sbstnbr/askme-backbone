define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.View.extend({
        el: document.body,

        initialize: function() {
            $(window).bind('resize.app', _.bind(this.$el.resize, this));

            this.attachCloseDialog();
        },

        attachCloseDialog: function() {
            $('.modal button.close').on('click', function() {
                $(this).parents('.modal:first').addClass('hidden');
                $('body').removeClass('no-scroll');
            });
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});