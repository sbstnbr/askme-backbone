define([
    'underscore',
    'backbone',
    'modules/Schedule/views/EventDetails',
    'text!/templates/event.tpl.html',
    'lib/breakpoints',
    'fullcalendar'
], function(_, Backbone, EventDetails, EventTemplate, Breakpoint) {
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
                minDate = (wsFirst > today) ? wsFirst : today,
                eventTemplate = _.template(EventTemplate),
                timeFormat = 'h:mm';
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
                height: 9999,
                allDaySlot: false,
                eventClick: function(event) {
                    var eventDetails = new EventDetails({ event: $.extend({}, event) });
                    eventDetails.render();
                },
                eventAfterRender: function(event, element) {
                    var attrs = {
                        title: event.title,
                        start: $.fullCalendar.formatDate(event.start, timeFormat),
                        end: $.fullCalendar.formatDate(event.end, timeFormat),
                        location: event.location,
                        presenters: event.presenters
                    };
                    element.find('.fc-event-inner').html(
                        eventTemplate({ model: attrs })
                    );
                },
                eventAfterAllRender: function(view) {
                    console.log(view);
                }
           });

           return this;
        },

        eventDropOrResize: function(event, allDay, revertFunc) {
            return false;
        }
    });
});