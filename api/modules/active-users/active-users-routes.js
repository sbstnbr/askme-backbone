'use strict';

module.exports = function (userCounterObject) {
    function getActiveUsers(request, reply) {
      return reply(userCounterObject);
    }

    return [
        {
            path: '/api/active-users',
            method: 'GET',
            handler: getActiveUsers
        }
    ]
};
