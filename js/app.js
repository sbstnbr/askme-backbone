define([
    'jquery',
    'foundation',
    'underscore',
    'backbone',
    'router'
], function($, Foundation, _, Backbone, Router){
    var initialize = function(){
        $(document).foundation();

        // Pass in our Router module and call it's initialize function
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});