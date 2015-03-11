define([
    'underscore',
    'backbone',
    'templates'
    ], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({
        el: document.body,

        initialize: function() {
            $(window).bind('resize.app', _.bind(this.$el.resize, this));
            $('.close-reveal-modal').on('click', this.cleanCloseModal);

            this.renderGlobalElements();
        },
        
        events: {
            'click .mainMenu .menuToggle' : 'toggleMainMenu'
        },
        
        toggleMainMenu: function() {
            $('.mainMenu ul').toggleClass('collapsed');
        },

        renderGlobalElements: function() {
            var headerTpl = JST['app/templates/header.hbs'],
                mainMenuTpl = JST['app/templates/main-menu.hbs'],
                footerTpl = JST['app/templates/footer.hbs'];

            $('.pageContainer > header').html(headerTpl());
            $('.mainMenu').html(mainMenuTpl());
            $('.pageContainer > footer').html(footerTpl());
        },

        cleanCloseModal: function() {
            $('body').removeClass('no-scroll');
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});
