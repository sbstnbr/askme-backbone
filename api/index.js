var Hapi = require('hapi');
var PORT = 8081;

var options = {
    port: PORT
};

var server = new Hapi.Server();
server.connection(options);

var questionRoutes = require('./modules/questions/questions-routes');
server.route(questionRoutes);

var eventRoutes = require('./modules/events/events-routes');
server.route(eventRoutes);

server.start(function () {
    console.log('Server started', server.info.uri);
});