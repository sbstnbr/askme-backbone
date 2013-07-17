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
            this.$el.fullCalendar({
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