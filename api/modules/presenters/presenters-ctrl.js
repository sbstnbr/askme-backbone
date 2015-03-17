var Joi = require('joi'),
    presentersDAO = require('./presenters-dao'),
    nominationsDAO = require('./nominations-dao'),
    ResponseHandler = require('../common/generic-response-handler');


exports.create = {
    handler: function (request, reply) {
        var handler = new ResponseHandler(reply);
        presentersDAO.create(request.payload)
            .then(function (data) {
                var id = data.insertId;
                return presentersDAO.get(id);
            })
            .then(handler.success, handler.error);
    },
    validate: {
        payload: {
            name: Joi.string().required().min(3),
            description: Joi.string().required().min(3),
            image_path: Joi.string().required().min(3)
        }
    }
};

exports.list = {
    handler: function (request, reply) {
        var handler = new ResponseHandler(reply);
        presentersDAO.list().then(handler.success, handler.error);
    }
};

exports.listFinalists = {
    handler: function (request, reply) {
        var handler = new ResponseHandler(reply);
        nominationsDAO.listFinalist().then(handler.success, handler.error);
    }
};

exports.get = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        presentersDAO.get(id).then(handler.success, handler.error);
    },
    validate: {
        params: {
            id: Joi.number().required().min(0)
        }
    }
};

exports.update = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        presentersDAO.update(id, request.payload)
            .then(function(data) {
                return presentersDAO.get(id);
            })
            .then(handler.success, handler.error);
    },
    validate: {
        payload: {
            id: Joi.number(),
            question: Joi.string().required().min(3),
            votes: Joi.number().required().min(0)
        },
        params: {
            id: Joi.number().required().min(0)
        }
    }
};

exports.nominate = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);

        presentersDAO.get(id)
            .then(function (doc) {
                return nominationsDAO.create({presenters_id: id, explenation: request.payload.explenation});
            })
            .then(handler.success, handler.error);
    },
    validate: {
        params: {
            id: Joi.number().required().min(0)
        },
        payload: {
            explenation: Joi.string().required().min(3)
        }
    }
};

exports.delete = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        presentersDAO.delete(id).then(handler.success, handler.error);
    },
    validate: {
        params: {
            id: Joi.number().required().min(0)
        }
    }
};
