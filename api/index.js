var Hapi = require('hapi');
var SocketIO = require('socket.io');

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

var io = SocketIO.listen(server.listener);

server.start(function () {
    console.log('Server started', server.info.uri);
});

var questionsDao = require('./modules/questions/questions-dao');
io.sockets.on('connection', function (client) {
    console.log('a user connected');
    client.on('disconnect', function () {
        console.log('user disconnected');
    });
    client.on('vote', function (message) {
        console.log('voting on ' + message.id);
        //persist to db a
        questionsDao.get(message.id)
            .then(function (result) {
                result.votes = result.votes + 1;
                return questionsDao.update(message.id, result);
            })
            .then(function () {
                return questionsDao.get(message.id);

            }).then(function(doc) {
                io.sockets.emit('update', {id: message.id, votes: doc.votes});
            });
    });
});