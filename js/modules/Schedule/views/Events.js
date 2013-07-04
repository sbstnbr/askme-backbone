define([
    'underscore',
    'backbone',
    'fullcalendar'
], function(_, Backbone, FullCalendar) {

    return Backbone.View.extend({

        initialize: function() {
            this.collection.bind('reset', this.addAll);
        },

        render: function() {
            this.$el.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay',
                    ignoreTimezone: false
                },
                selectable: true,
                selectHelper: true,
                editable: true
            });
        },

        addAll: function() {
            this.$el.fullCalendar('addEventSource', this.collection.toJSON());
        }
    });
});