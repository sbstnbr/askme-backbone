var identityController = require('./identity-ctrl');

module.exports = (function () {
    return [
        {
            path: '/api/identity',
            method: 'GET',
            config: identityController.get
        }, 
        {
        	path: '/api/purge_database',
        	method: 'GET',
        	config: identityController.purge_database
        }
    ];
}());
