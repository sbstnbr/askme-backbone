var Hapi = require('hapi');
var SocketIO = require('socket.io');
var path = require('path');
var PORT = 8081;

var options = {
    port: PORT
};

var server = new Hapi.Server();
server.connection(options);

var questionRoutes = require('./modules/questions/questions-routes');
server.route(questionRoutes);

var io = SocketIO.listen(server.listener);

server.start(function () {
    console.log('Server started', server.info.uri);
});


server.route(require('./modules/rating/rating-routes'));
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, '../dist/')
        }
    }
});



var questionsDao = require('./modules/questions/questions-dao');
var ratingDao = require('./modules/rating/rating-dao');
io.sockets.on('connection', function (client) {
    console.log('a user connected');
    client.on('disconnect', function () {
        console.log('user disconnected');
    });
    client.on('vote', function (message) {
        console.log('vote handler');
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
    });

    client.on('downvote', function (message) {
        console.log('downvote handler');
        questionsDao.get(message.id)
            .then(function (result) {
                result.votes = result.votes + -1;
                return questionsDao.update(message.id, result);
            })
            .then(function () {
                return questionsDao.get(message.id);
            })
            .then(function (doc) {
                io.sockets.emit('question:update', {id: message.id, votes: doc.votes});
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

    client.on('rating:neworupdate', function(message) {
        var array = [];
        var consoleHandler = function(message) {
            console.log(message);
        };
        var handler = function() {
            ratingDao.overall()
                .then(function(result) {
                    result.type = "overall";
                    array.push(result);
                    return ratingDao.entertaining();
                })
                .then(function(result) {
                    result.type = "entertaining";
                    array.push(result);
                    return ratingDao.relevance();
                })
                .then(function(result) {
                    result.type = "relevance";
                    array.push(result);
                    return array;
                })
                .done(function() {
                    console.log('handler done');
                    io.sockets.emit('rating:update', array);
                });
            //io.sockets.emit('rating:update', doc);
        };
        ratingDao.get(message.uuid)
            .catch(consoleHandler)
            .done(function(m) {
                if(m === undefined) {
                    //create new
                    ratingDao.create(message).then(handler);
                    console.log('new handler')
                } else {
                    //update old
                    console.log('update handler');
                    ratingDao.update(message.uuid, message).then(handler)
                }
            });
    });
});