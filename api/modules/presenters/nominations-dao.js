var GenericDao = require('../common/generic-dao');
var dao = new GenericDao();

exports.create = function(doc) {
    var sqlQuery = 'INSERT INTO nominations(presenters_id, explenation, nominator) VALUES (?, ?, ?)';
    var values = [doc.presenters_id, doc.explenation, doc.nominator];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.promiseQuery(sqlQuery);
};

exports.list = function () {
    var sqlQuery = 'SELECT  * FROM nominations';
    return dao.promiseQuery(sqlQuery);
};

exports.get = function (id) {
    var sqlQuery = 'SELECT  * FROM nominations WHERE presenter_id = ?';
    var values = [id];
    sqlQuery = dao.format(sqlQuery, values);
    return dao.get(sqlQuery);
};

exports.listFinalist = function() {
    var sqlQuery = 'SELECT presenters.name, COUNT(*) as count FROM `presenters` INNER JOIN `nominations` on presenters.id = nominations.presenters_id GROUP BY presenters.id ORDER BY count DESC;';
    return dao.promiseQuery(sqlQuery);
}