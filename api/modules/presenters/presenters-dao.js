var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO presenters(name, description, image_path) VALUES (?, ?, ?)';
    var values = [doc.name, doc.description, doc.image_path];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM presenters';
    return dao.promiseQuery(sqlQuery);
};

exports.get = function (id) {
    var sqlQuery = 'SELECT  * FROM presenters WHERE id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.get(sqlQuery);
};

exports.update = function (id, doc) {
    var sqlQuery = 'UPDATE presenters SET name = ?, description = ?, image_path = ?, votes = ? WHERE id = ?';
    var values = [doc.name, doc.description, doc.image_path, doc.votes, id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    console.log('sql: ',sqlQuery);
    return dao.promiseQuery(sqlQuery);
};

exports.delete = function (id) {
    var sqlQuery = 'DELETE FROM presenters WHERE id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};
