var GenericDao = require('../common/generic-dao');
var underscore = require('underscore');

var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO event(start, end, allDay, subject, location, description, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var values = [doc.start, doc.end, doc.allDay, doc.subject, doc.location, doc.description, doc.category];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT event.*, GROUP_CONCAT(presenters.name SEPARATOR ", ") as presenters FROM `event` JOIN `event_presenter` ON event.id = event_presenter.event_id JOIN `presenters` ON event_presenter.presenter_id = presenters.id GROUP BY event.id';
    return dao.promiseQuery(sqlQuery);
};

exports.findPresenters = function(eventId) {
    var sqlQuery = 'SELECT presenters.* FROM `presenters` JOIN `event_presenter` on presenters.id = event_presenter.presenter_id WHERE event_presenter.event_id = ?';
    sqlQuery = dao.connection.format(sqlQuery, eventId);
    return dao.promiseQuery(sqlQuery);
};

exports.update = function (id, doc) {
    var sqlQuery = 'UPDATE event SET start = ?, end = ?, allDay = ?, subject = ?, location = ?, description = ?, category = ?  WHERE id = ?';
    var values = [doc.start, doc.end, doc.allDay, doc.subject, doc.location, doc.description, doc.category, id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.delete = function (id) {
    var sqlQuery = 'DELETE FROM event WHERE id = ?';
    var values = [id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};