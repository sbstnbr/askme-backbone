define([
    'underscore',
    'backbone',
    'modules/Questions/models/Question'
], function(_, Backbone, QuestionModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: QuestionModel,
        url: 'api/questions',
        initialize: function () {
            this.listenTo(Backbone, 'question:update', this.updateHandler);
            this.listenTo(Backbone, 'question:new', this.newHandler);
        },
        updateHandler: function (message) {
            console.log('model:update handler with ' + message);
            var model = this.get(message.id);
            model.set('votes', message.votes);
            this.sort();
        },
        newHandler: function (message) {
            console.log('model:new handler with ' + message);
            var model = new this.model(message);
            this.add(model);
        }
    });
});