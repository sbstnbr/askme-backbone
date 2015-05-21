var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO uuid_rating (uuid, overall_rating, relevance_rating, entertaining_rating) VALUES (?, ?, ?, ?)';
    var values = [doc.uuid, doc.overall_rating, doc.relevance_rating, doc.entertaining_rating];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.get = function(id) {
    var sqlQuery = 'SELECT * FROM uuid_rating WHERE uuid = ?';
    var values = [id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.get(sqlQuery);
};

exports.update = function(id, doc) {
    var sqlQuery = 'UPDATE uuid_rating SET overall_rating = ?, relevance_rating = ?, entertaining_rating = ?  WHERE uuid = ?';
    var values = [doc.overall_rating, doc.relevance_rating, doc.entertaining_rating, id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.delete = function(id) {
    var sqlQuery = 'DELETE FROM uuid_rating WHERE uuid = ?';
    var values = [id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};


exports.overall = function() {
    var sqlQuery = 'SELECT sum(overall_rating) AS sum, count(*) votes FROM uuid_rating WHERE overall_rating > 0 ';
    return dao.get(sqlQuery);
};

exports.relevance = function() {
    var sqlQuery = 'SELECT sum(relevance_rating) AS sum, count(*) votes FROM uuid_rating WHERE relevance_rating > 0 ';
    return dao.get(sqlQuery);
};

exports.entertaining = function() {
    var sqlQuery = 'SELECT sum(entertaining_rating) AS sum, count(*) votes FROM uuid_rating WHERE entertaining_rating > 0 ';
    return dao.get(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM uuid_rating';
    return dao.promiseQuery(sqlQuery);
};

