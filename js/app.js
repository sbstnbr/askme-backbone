define([
    'jquery',
    'foundation',
    'underscore',
    'backbone',
    'router'
], function($, Foundation, _, Backbone, Router){
    var initialize = function(){
        $(document).foundation();

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});