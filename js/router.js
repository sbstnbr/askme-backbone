define([
    'jquery',
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView',
    'modules/Schedule/controller'
], function($, _, Backbone, AppView, IndexView, ScheduleController) {
    'use strict';

    var initialize = function() {

        var appView = new AppView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'add-event(/)': 'addEvent',
                'edit-event/:id(/)': 'editEvent',
                'save-event(/)': 'saveEvent',
                '*actions': 'defaultAction'
            },

            addEvent: function() {
                appView.clearModal();
                ScheduleController.addEvent();
            },

            editEvent: function(id) {
                appView.clearModal();
                ScheduleController.editEvent(id);
            },

            saveEvent: function() {
            },

            defaultAction: function(actions) {
                new IndexView().render();
            }
        }));

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
