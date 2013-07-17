define([
    'underscore',
    'backbone',
    'text!/templates/index.tpl.html',
    'modules/Schedule/controller',
    'modules/Questions/controller'
], function(_, Backbone, IndexTemplate, ScheduleController, QuestionsController) {
    'use strict';

    return Backbone.View.extend({

        el: $('.contentWrapper'),

        template: _.template(IndexTemplate),

        render: function() {
            this.$el.html(this.template({}));

            ScheduleController.initialize();

            QuestionsController.initialize();

            var $window = $(window);
            $window.on('resize.app', function() {
                ScheduleController.adjustOnResize( {width: $window.width()} );
            });
        }
    });
});