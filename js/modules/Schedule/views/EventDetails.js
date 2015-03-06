define([
    'underscore',
    'backbone',
    'handlebars',
    'text!../../../../templates/event-details.hbs'
], function(_, Backbone, Handlebars, EventDetailsTemplate) {
    'use strict';

    return Backbone.View.extend({

        el: $('.modal > .dialog > .content')[0],

        template: Handlebars.compile(EventDetailsTemplate),

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
                .parents('.modal:first').removeClass('hidden');

            return this;
        }
    });
});