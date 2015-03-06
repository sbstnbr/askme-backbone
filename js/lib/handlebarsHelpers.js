'use strict';
define(['handlebars', 'underscore'], function (Handlebars, _) {

    Handlebars.registerHelper('handleVotes', function(numberOfVotes) {
        return numberOfVotes === '1' ? '' : 's';
    });

    Handlebars.registerHelper('handlePresenters', function(presenters) {
        var str = '';
        _.each(presenters, function(presenter) {
            str = str + ', ' + presenter.name;
        });
        var index = str.lastIndexOf(',');
        if (index > 0) {
            str = str.substring(2, index) + ' &' + str.substr(index + 1);
        } else {
            str = str.substring(2);
        }

        return str;
    }); 
});
