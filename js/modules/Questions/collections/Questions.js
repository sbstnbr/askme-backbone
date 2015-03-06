define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question'
], function(_, Backbone, EventModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: EventModel,
        url: 'api/questions.php'
    });
});