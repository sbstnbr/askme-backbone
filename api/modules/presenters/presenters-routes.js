var presentersController = require('./presenters-ctrl');

module.exports = (function () {
    return [
        {
            path: '/api/presenters',
            method: 'POST',
            config: presentersController.create
        },
        {
            path: '/api/presenters',
            method: 'GET',
            config: presentersController.list
        },
        {
            path: '/api/presenters/{id}',
            method: 'GET',
            config: presentersController.get
        },
        {
            path: '/api/presenters/{id}',
            method: 'PUT',
            config: presentersController.update
        },
        {
            path: '/api/presenters/{id}/nominate',
            method: 'POST',
            config: presentersController.nominate
        },
        {
            path: '/api/presenters/{id}',
            method: 'DELETE',
            config: presentersController.delete
        }
    ]
}());
