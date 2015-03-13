define(['socket.io', 'backbone'], function(io, Backbone) {
    var socket = io.connect({transports: ['websocket', 'xhr-polling']});
    socket.on('update', function(message) {
        Backbone.trigger('model:update', message);

    });
    return socket
});