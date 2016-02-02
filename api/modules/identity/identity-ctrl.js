'use strict';

var fs = require('fs');
var GenericDao = require('../common/generic-dao');

var productionHandler = function (request, reply) {
  if(request.headers.enterpriseid) {
    reply({name: request.headers.enterpriseid});
  } else {
    reply({message: 'corresponding shibb session not found'}).code(404);
  }
};

var testingHandler = function(request, reply) {
  reply({name: 'testing.user'});
}

exports.get = {
  handler: process.env.NODE_ENV === 'production' ? productionHandler : testingHandler
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
