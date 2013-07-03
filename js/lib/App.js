define(
    ['backbone'],
    function (Backbone) {
        var schedules = new (Backbone.View.extend({
                Collections : {},
                Models : {},
                Views : {}
            }))({el : document.body});

        var init = function() {
            console.log('Init application');
        }

        return {
            schedules : schedules,
            init : init
        }
    }
);
