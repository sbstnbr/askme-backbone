var mysql = require('mysql');
var Q = require('q');

function GenericDao(config) {
    var connectionConfig = {
        host: 'localhost',
        user: 'questions',
        password: 'x2YfU8vHqAATS7Sh',
        database: 'questions'
    };

    return {
        format: mysql.format,
        promiseQuery: function (sql) {
            var connection = mysql.createConnection(connectionConfig);
            var deferred = Q.defer();
            connection.query(sql, function (err, results) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(results);
                }
                connection.end();
            });
            return deferred.promise;
        },
        get: function (sql) {
            var connection = mysql.createConnection(connectionConfig);
            var deferred = Q.defer();
            connection.query(sql, function (err, results) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(results[0]);
                }
                connection.end();
            });
            return deferred.promise;
        }
    }
}

module.exports = GenericDao;