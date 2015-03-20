var eventsController = require('./events-ctrl');

module.exports = (function () {
    return [
        {
            path: '/api/events',
            method: 'POST',
            config: eventsController.create
        },
        {
            path: '/api/events',
            method: 'GET',
            config: eventsController.list
        },
        {
            path: '/api/events/{id}',
            method: 'PUT',
            config: eventsController.update
        },
        {
            path: '/api/events/{id}/presenters',
            method: 'GET',
            config: eventsController.findPresenters  
        },
        {
            path: '/api/events/{id}',
            method: 'DELETE',
            config: eventsController.delete
        }
    ]
}());