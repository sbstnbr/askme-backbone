define([
    'jquery',
    'underscore',
    'backbone',
    'views/AppView',
    'views/IndexView'
], function($, _, Backbone, AppView, IndexView) {
    'use strict';

    var initialize = function() {

        var appView = new AppView();

        var appRouter = new (Backbone.Router.extend({
            routes: {
                'add-event': 'addEvent',
                'edit-event/:id': 'editEvent',
                '*actions': 'defaultAction'
            },

            addEvent: function() {
            },

            editEvent: function() {
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
