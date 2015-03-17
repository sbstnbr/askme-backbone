define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.Collection.extend({
        model: Backbone.Model,
        url: 'api/presenters/finalists'
    });
});
