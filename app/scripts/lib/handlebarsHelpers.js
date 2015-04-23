'use strict';

define(['handlebars'], function (Handlebars) {

    Handlebars.registerHelper('handleVotes', function(numberOfVotes) {
        return numberOfVotes === '1' ? '' : 's';
    });

    Handlebars.registerHelper('handlePresenters', function(str) {
        var index = str.lastIndexOf(',');
        if (index > 0) {
            str = str.substring(0, index) + ' &' + str.substr(index + 1);
        }

        return str;
    });

});
