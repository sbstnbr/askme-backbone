var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO event(start, end, allDay, subject, location, description, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var values = [doc.start, doc.end, doc.allDay, doc.subject, doc.location, doc.description, doc.category];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM event';
    return dao.promiseQuery(sqlQuery);
};

exports.update = function (id, doc) {
    var sqlQuery = 'UPDATE event SET start = ?, end = ?, allDay = ?, subject = ?, location = ?, description = ?, category = ?  WHERE id = ?';
    var values = [doc.start, doc.end, doc.allDay, doc.subject, doc.location, doc.description, doc.category, id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.delete = function (id) {
    var sqlQuery = 'DELETE FROM event WHERE id = ?';
    var values = [id];
    sqlQuery = dao.connection.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};