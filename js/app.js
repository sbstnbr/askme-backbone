define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'foundation'
], function($, _, Backbone, Router){
    'use strict';

    var initialize = function(){
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});