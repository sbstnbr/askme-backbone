define([
    'underscore',
    'backbone',
    'handlebars',
    'text!../../templates/header.hbs',
    'text!../../templates/main-menu.hbs',
    'text!../../templates/footer.hbs'
], function(_, Backbone, Handlebars, HeaderTpl, MainMenuTpl, FooterTpl) {
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
            var headerTpl = Handlebars.compile(HeaderTpl),
                mainMenuTpl = Handlebars.compile(MainMenuTpl),
                footerTpl = Handlebars.compile(FooterTpl);
                
            $('.pageContainer > header').html(headerTpl());
            $('.mainMenu').html(mainMenuTpl());
            $('.pageContainer > footer').html(footerTpl());
            
        },

        cleanCloseModal: function() {
            console.log('juuu');
            $('body').removeClass('no-scroll');
        },

        remove: function() {
            $(window).unbind('resize.app');
            Backbone.View.prototype.remove.call(this);
        }
    });
});
