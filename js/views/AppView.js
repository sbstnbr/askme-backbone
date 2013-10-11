define([
    'underscore',
    'backbone',
    'text!../../templates/header.tpl.html',
    'text!../../templates/main-menu.tpl.html',
    'text!../../templates/footer.tpl.html'
], function(_, Backbone, HeaderTpl, MainMenuTpl, FooterTpl) {
    'use strict';

    function _closeModal($modal) {
        $modal || ($modal = $('.modal:first'));
        $modal.addClass('hidden');
        $modal.find('.content').html('');
        $('body').removeClass('no-scroll');
    }

    return Backbone.View.extend({
        el: document.body,

        initialize: function() {
            $(window).bind('resize.app', _.bind(this.$el.resize, this));

            this.renderGlobalElements();
            this.attachCloseDialog();
        },
        
        events: {
            'click .mainMenu .menuToggle' : 'toggleMainMenu'
        },
        
        toggleMainMenu: function() {
            $('.mainMenu ul').toggleClass('collapsed');
        },

        renderGlobalElements: function() {
            var headerTpl = _.template(HeaderTpl),
                mainMenuTpl = _.template(MainMenuTpl),
                footerTpl = _.template(FooterTpl);
                
            $('.pageContainer > header').html(headerTpl());
            $('.mainMenu').html(mainMenuTpl());
            $('.pageContainer > footer').html(footerTpl());
            
        },
        
        attachCloseDialog: function() {
            var $closeButton = $('.modal button.close');
            $closeButton.on('click', function() {
                _closeModal();
            });

            $(window).on('keyup', function(evt) {
                if (evt.which === 27 && !$('.modal').hasClass('hidden')) { // ESC
                    evt.preventDefault();
                    _closeModal();
                }
            });
        },
        
        clearModal: function() {
            _closeModal();
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});