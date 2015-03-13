var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO nominations(presenters_id, explenation) VALUES (?, ?)';
    var values = [doc.presenters_id, doc.explenation];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM nominations';
    return dao.promiseQuery(sqlQuery);
};

exports.get = function (id) {
    var sqlQuery = 'SELECT  * FROM nominations WHERE presenter_id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.get(sqlQuery);
};
