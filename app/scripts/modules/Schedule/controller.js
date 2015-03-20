define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Schedule/collections/Events',
    'modules/Schedule/views/Events',
], function($, _, Backbone, EventsCollection, EventsView) {
    'use strict';

    var events = new EventsCollection();
    var eventsView = null;

    var initialize = function() {
        eventsView = new EventsView({ el: $('#schedule > .calendar'), collection: events });
        eventsView.render();
    };

    var adjustOnResize = function(dimensions) {
        eventsView.adjustOnResize(dimensions);
    };

    return {
        initialize: initialize,
        adjustOnResize: adjustOnResize
    }
});
