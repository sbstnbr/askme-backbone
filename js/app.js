define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'foundation'
], function($, _, Backbone, Router){
    'use strict';

    var initialize = function(){
        $(document).foundation();

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});