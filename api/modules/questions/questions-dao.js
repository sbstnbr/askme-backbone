var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();


exports.create = function (doc) {
    var sqlQuery = 'INSERT INTO question (question) VALUES (?)';
    var values = [doc.question];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM question';
    return dao.promiseQuery(sqlQuery);
};

exports.get = function (id) {
    var sqlQuery = 'SELECT  * FROM question WHERE id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.get(sqlQuery);
};

exports.update = function (id, doc) {
    var sqlQuery = 'UPDATE question SET question = ?, votes = ?  WHERE id = ?';
    var values = [doc.question, doc.votes, doc.id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.delete = function (id) {
    var sqlQuery = 'DELETE FROM question WHERE id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};
