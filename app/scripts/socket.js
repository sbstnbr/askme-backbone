define(['socket.io', 'backbone'], function(io, Backbone) {
    var socket = io.connect({transports: ['websocket', 'xhr-polling']});
    socket.on('question:update', function(message) {
        Backbone.trigger('question:update', message);

    });
    socket.on('question:new', function(message) {
        Backbone.trigger('question:new', message);
    });
    return socket;
});