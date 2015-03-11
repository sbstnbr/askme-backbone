define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        el: $('.reveal-modal > .dialog > .content')[0],

        template: JST['app/templates/event-details.hbs'],

        render: function() {
            if (_.isEmpty(this.options.event)) {
                throw 'No scheduled event selected to render';
            }

            $('body').addClass('no-scroll');
            
            var dateFormat = 'dddd MMMM dS yyyy, hh:mm tt';
            this.options.event.start = $.fullCalendar.formatDate(this.options.event.start, dateFormat);
            this.options.event.end = $.fullCalendar.formatDate(this.options.event.end, dateFormat);

            this.$el
                .html(this.template(this.options.event))
                .parents('.reveal-modal').foundation('reveal', 'open');

            return this;
        }
    });
});
