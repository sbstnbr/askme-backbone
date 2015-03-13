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
            this.listenTo(Backbone, 'model:update', this.updateHandler);
        },
        updateHandler: function (message) {
            console.log('model:update handler with ' + message);
            var model = this.get(message.id);
            model.set('votes', message.votes);
        },
        comparator: function(model) {
            return -model.get('votes');
        }
    });
});