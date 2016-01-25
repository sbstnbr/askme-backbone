'use strict';

module.exports = function (statistics) {
    function getStatistics(request, reply) {
      return reply(statistics);
    }

    function resetTotalUsers(request, reply) {
      statistics.totalUsers = 0;
      reply(statistics);
    }

    return [
        {
          path: '/api/statistics',
          method: 'GET',
          handler: getStatistics
        },
        {
          path: '/api/statistics/reset-total',
          method: 'POST',
          handler: resetTotalUsers
        }
    ]
};
