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

var presentersRouters = require('./modules/presenters/presenters-routes');
server.route(presentersRouters);

var io = SocketIO.listen(server.listener);

server.start(function () {
    console.log('Server started', server.info.uri);
});

var questionsDao = require('./modules/questions/questions-dao');
var userQuestionDao = require('./modules/questions/uuid-dao');
io.sockets.on('connection', function (client) {
    console.log('a user connected');
    client.on('disconnect', function () {
        console.log('user disconnected');
    });
    client.on('vote', function (message) {
        console.log('vote handler');
        var uuid = message.uuid;
        userQuestionDao.get(uuid, message.id).then(function (result) {
            if (result !== undefined && result !== null && result.length === 0) {
                userQuestionDao.create(message);
                questionsDao.get(message.id)
                    .then(function (result) {
                        result.votes = result.votes + 1;
                        return questionsDao.update(message.id, result);
                    })
                    .then(function () {
                        return questionsDao.get(message.id);
                    })
                    .then(function (doc) {
                        io.sockets.emit('question:update', {id: message.id, votes: doc.votes});
                    });
            }
        });
    });

    client.on('question:new', function(message) {
        console.log(message.question);
        questionsDao.create(message)
            .then(function (data) {
                var id = data.insertId;
                console.log('create results into ' + data);
                return questionsDao.get(id);
            })
            .then(function(doc) {
                console.log('emmiting message ', doc.question);
                io.sockets.emit('question:new', doc);
            }, function(reason) {
                console.log('Failed with', reason);
            });
    });
});