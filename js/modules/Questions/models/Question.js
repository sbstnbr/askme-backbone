define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: 'api/questions.php'
    });
});