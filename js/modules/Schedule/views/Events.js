define([
    'underscore',
    'backbone',
    'modules/Schedule/views/EventDetails',
    'lib/breakpoints',
    'fullcalendar'
], function(_, Backbone, EventDetails, Breakpoint) {
    'use strict';

    var _isMobileViewport = function(width) {
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
            var isMobile = _isMobileViewport(dimensions.width),
                header = {
                    $first: this.$el.find('.fc-header td:eq(0)'),
                    $second: this.$el.find('.fc-header td:eq(1)')
                };

            if (isMobile && header.$first.find('.fc-button-month').length) {
                header.$first
                    .removeClass('fc-header-left fc-header-center')
                    .addClass('fc-header-center');
                header.$second
                    .removeClass('fc-header-left fc-header-center')
                    .addClass('fc-header-left')
                    .insertBefore(header.$first);
            } else if (!isMobile && header.$first.find('.fc-header-title').length) {
                header.$second
                    .removeClass('fc-header-left fc-header-center')
                    .addClass('fc-header-left');
                header.$first
                    .removeClass('fc-header-left fc-header-center')
                    .addClass('fc-header-center')
                    .insertAfter(header.$second);
            }
        },

        render: function() {
            var header = {
                    left: 'month,basicWeek,basicDay',
                    center: 'title',
                    right: 'today prev,next'
                };

            if (_isMobileViewport($(window).width())) {
                header.left = 'title';
                header.center = 'month,basicWeek,basicDay';
            }

            this.$el.fullCalendar({
                header: header,
                selectable: true,
                selectHelper: true,
                editable: true,
                ignoreTimezone: false,
                eventClick: function(event) {
                    var eventDetails = new EventDetails({ event: $.extend({}, event) });
                    eventDetails.render();
                }
           });
        }
    });
});