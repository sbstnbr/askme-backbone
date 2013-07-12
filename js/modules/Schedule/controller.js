define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Schedule/collections/Events',
    'modules/Schedule/views/Events',
    'modules/Schedule/views/EditEventForm'
], function($, _, Backbone, EventsCollection, EventsView, EditEventForm) {
    'use strict';

    var events = new EventsCollection();
    var eventsView = null;
    var eventForm = new EditEventForm();

    var _editEvent = function(model) {
        eventForm.model = model;
        eventForm.render();
    }

    var initialize = function() {
        eventsView = new EventsView({ el: $('#schedule > .calendar'), collection: events });
        eventsView.render();
    };

    var adjustOnResize = function(dimensions) {
        eventsView.adjustOnResize(dimensions);
    };

    var addEvent = function() {
        var model = {
            title: '',
            start: '',
            end: '',
            location: '',
            allDay: false,
            attendees: []
        };
        _editEvent(model);
    }

    var editEvent = function(id) {
        eventForm.clear();
        events.fetch({
            data: { id: id },
            success: function(model, response, options) {
                var jsonModel = model.toJSON();
                _editEvent(jsonModel[0]);
            }
        });
    }

    return {
        initialize: initialize,
        adjustOnResize: adjustOnResize,
        addEvent: addEvent,
        editEvent: editEvent
    }
});
