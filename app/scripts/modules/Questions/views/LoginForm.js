define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),
        template: JST['app/templates/login.hbs'],
        events: {
            submit: 'submit'
        },

        submit: function(evt) {
            evt.preventDefault();
            var username = this.$('#username').val();
            console.log('username entered is: ', username);
        }
    });
});
