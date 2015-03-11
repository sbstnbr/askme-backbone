define([
    'underscore',
    'backbone',
    'modules/Schedule/models/Event'
], function(_, Backbone, EventModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: EventModel,
        url: 'api/events'
    });
});