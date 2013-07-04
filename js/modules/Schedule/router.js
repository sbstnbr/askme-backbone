define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Schedule/collections/Events',
    'modules/Schedule/views/Events'
], function($, _, Backbone, EventsCollection, EventsView) {

        var initialize = function() {

            var events = new EventsCollection();
            new EventsView({ el: $('#schedule > .calendar'), collection: events }).render();
        }

        return {
            initialize: initialize
        }
    }
);
