define(
    ['backbone', 'foundation', 'fullcalendar'],
    function (Backbone) {
        var schedules = new (Backbone.View.extend({
                Collections : {},
                Models : {},
                Views : {}
            }))({el : document.body});

        var init = function() {
            $(document).foundation();
            $('#schedule > .calendar').fullCalendar({});
        }

        return {
            schedules : schedules,
            init : init
        }
    }
);
