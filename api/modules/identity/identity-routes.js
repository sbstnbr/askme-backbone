var identityController = require('./identity-ctrl');

module.exports = (function () {
    return [
        {
            path: '/api/identity',
            method: 'GET',
            config: identityController.get
        }
    ];
}());
