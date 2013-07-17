define([
    'underscore',
    'backbone',
    'modules/Schedule/views/EventDetails',
    'lib/breakpoints',
    'fullcalendar'
], function(_, Backbone, EventDetails, Breakpoint) {
    'use strict';

    var _isTabletViewport = function(width) {
        return width <= Breakpoint.iPad.portrait;
    }

    return Backbone.View.extend({

        initialize: function() {
            var that = this;
            this.collection.fetch({
                reset: true,
                success: function(model, response, options) {
                    that.$el.fullCalendar('addEventSource', model.toJSON());
                },
                error : function(model, response, options) {
                    console.log('Error loading events from server');
                }
            });
        },

        adjustOnResize: function(dimensions) {
        },

        render: function() {
            var today = new Date(),
                wsFirst = new Date(2013, 6, 22),
                minDate = (wsFirst > today) ? wsFirst : today;
            this.$el.fullCalendar({
                date: minDate.getDate(),
                month: minDate.getMonth(),
                year: minDate.getFullYear(),
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                defaultView: 'agendaDay',
                selectable: false,
                selectHelper: false,
                editable: false,
                ignoreTimezone: false,
                minTime: 8,
                maxTime: 22,
                height: 999,
                allDaySlot: false,
                eventClick: function(event) {
                    var eventDetails = new EventDetails({ event: $.extend({}, event) });
                    eventDetails.render();
                }
           });
        },

        eventDropOrResize: function(event, allDay, revertFunc) {
            return false;
        }
    });
});