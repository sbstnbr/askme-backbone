var mysql = require('mysql');
var Q = require('q');

function GenericDao(config) {
    var connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'questions',
        password: process.env.DB_PASSWORD || 'x2YfU8vHqAATS7Sh',
        database: process.env.DB_NAME || 'questions'
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