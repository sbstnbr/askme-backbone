define([
    'underscore',
    'backbone',
    'handlebars',
    'text!../../templates/index.hbs',
    'modules/Schedule/controller'
], function(_, Backbone, Handlebars, IndexTemplate, ScheduleController) {
    'use strict';

    return Backbone.View.extend({

        el: $('.contentWrapper'),

        template: Handlebars.compile(IndexTemplate),

        render: function() {
            var $hiddenSections = this.$el.children('.hide');

            if (!!$hiddenSections.length) {
                $hiddenSections.removeClass('hide');
                $('#schedule').children('h2, p').addClass('hide');
            } else {
                this.$el.html(this.template({}));

                ScheduleController.initialize();

                var $window = $(window);
                $window.on('resize.app', function() {
                    ScheduleController.adjustOnResize( {width: $window.width()} );
                    $('html,body').css('background-size', 'cover');
                });
            }

            return this;
        },

        showOnlySchedule: function() {
            if (this.$el.html() === '') {
                this.render();
            }
            this.$el.children('[id!=schedule]').addClass('hide');
            $('#schedule').children('.hide').removeClass('hide');
        }
    });
});
