'use strict';

var fs = require('fs');
var GenericDao = require('../common/generic-dao');

exports.get = {
    handler: function (request, reply) {
	if(request.headers.enterpriseid) {
		reply({name: request.headers.enterpriseid});
	} else {
	        reply({message: 'corresponding shibb session not found'}).code(404);
	}      
    }
};

exports.purge_database = {
  handler: function (request, reply) {
    var dao = new GenericDao();
    var sqlDeleteQuestions = 'DELETE FROM `question`;';
    var sqlDeleteRatings = 'DELETE FROM `uuid_rating`;';
    var sqlDeleteVotes = 'DELETE FROM `uuid_votes`;';

    return dao.promiseQuery(sqlDeleteQuestions)
      .then(function() { return dao.promiseQuery(sqlDeleteRatings); })
      .then(function() { return dao.promiseQuery(sqlDeleteVotes); })
      .then(function() { reply({status: 'Now your journey to the dark side is COMPLETE!'}); })
      .catch(function(err) { console.log(err); reply(err); });
  }
};
