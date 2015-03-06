define([
    'underscore',
    'backbone',
    'router',
    'handlebarsHelpers'
], function(_, Backbone, Router, HandlebarHelpers){
    'use strict';

    var initialize = function(){
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});