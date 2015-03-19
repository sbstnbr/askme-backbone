define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question'
], function(_, Backbone, EventModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: EventModel,
        url: 'api/questions',
        initialize: function () {
            this.listenTo(Backbone, 'question:update', this.updateHandler);
            this.listenTo(Backbone, 'question:new', this.newHandler);
        },
        updateHandler: function (message) {
            console.log('model:update handler with ' + message);
            var model = this.get(message.id);
            model.set('votes', message.votes);
        },
        newHandler: function (message) {
            console.log('model:new handler with ' + message);
            var model = new this.model(message);
            this.add(model);
        },
        comparator: function(model) {
            return -model.get('votes');
        }
    });
});