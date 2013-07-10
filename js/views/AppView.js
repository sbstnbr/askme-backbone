define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    function _closeModal() {
        this.parents('.modal:first').addClass('hidden');
        $('body').removeClass('no-scroll');
    }

    return Backbone.View.extend({
        el: document.body,

        initialize: function() {
            $(window).bind('resize.app', _.bind(this.$el.resize, this));

            this.attachCloseDialog();
        },

        attachCloseDialog: function() {
            var $closeButton = $('.modal button.close');
            $closeButton.on('click', function() {
                _closeModal.call($(this));
            });

            $(window).on('keyup', function(evt) {
                if (evt.which === 27 && !$('.modal').hasClass('hidden')) { // ESC
                    evt.preventDefault();
                    _closeModal.call($closeButton);
                }
            });
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});