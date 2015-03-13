define([
    'underscore',
    'backbone',
    'modules/Nominate/models/Presenter'
], function(_, Backbone, PresenterModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: PresenterModel,
        url: 'api/presenters'
    });
});
