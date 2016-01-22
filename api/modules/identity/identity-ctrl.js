'use strict';

var fs = require('fs');
var GenericDao = require('../common/generic-dao');
var ResponseHandler = require('../common/generic-response-handler');
var AT_SIGH_CHAR = '@',
  UNDERSCORE_CHAR = '_',
  SPACE_CHAR = ' ',
  NEWLINE_CHAR = '\n';

//expecting cookie with this pair
//_shibsession_64656661756c7468747470733a2f2f61736b6d652e616363656e747572652e636f6d=_ef23a075be00a4acedf69dae5b70e932
if(process.env.NODE_ENV !== 'production') {
  console.log('running a development instance ...');
  var shibTransactionFile = './api/transaction.log';
} else {
  console.log('running a production instance ...');
  var shibTransactionFile = '/shibb-logs/transaction.log';
}

exports.get = {
    handler: function (request, reply) {
      var sessionID =
      Object.getOwnPropertyNames(request.state).reduce(function(prev, curr) {
        if(curr.indexOf('_shibsession_') !== -1) {
          return request.state[curr];
        } else {
          return prev;
        }
      }, null);

      if(sessionID === null) {
        return reply({message: 'shibb id not found'}).code(404);
      }

      fs.readFile(shibTransactionFile, {encoding: 'UTF-8'}, function(err, data) {
          if(err) {
              throw err;
          }

          var lines = data.split(NEWLINE_CHAR);

          for(var i = 0, len = lines.length; i < len; i++) {
              var shib = lines[i].split(SPACE_CHAR)[8];

              //find the shibb session ID
              if(shib !== undefined &&
                  shib[0] === UNDERSCORE_CHAR &&
                  shib.slice(0, -1) === sessionID) {

                  var email = lines[i].split(SPACE_CHAR)[22].slice(0, -1);
                  var eid = email.split(AT_SIGH_CHAR)[0];

                  reply({name: eid});
		              return;
              }
          }
	        reply({message: 'corresponding shibb session not found'}).code(404);
      });
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