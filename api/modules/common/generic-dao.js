var mysql = require('mysql');
var Q = require('q');

function GenericDao(config) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'taw2013',
        password: 'x2YfU8vHqAATS7Sh',
        database: 'taw2013'
    });

    return {
        connection: connection,
        promiseQuery: function (sql) {
            var deferred = Q.defer();
            connection.query(sql, function (err, results) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(results);
                }
            });
            return deferred.promise;
        },
        get: function (sql) {
            var deferred = Q.defer();
            connection.query(sql, function (err, results) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    deferred.resolve(results[0]);
                }
            });
            return deferred.promise;
        }
    }
}

module.exports = GenericDao;