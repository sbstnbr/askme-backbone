var Joi = require('joi'),
    eventsDAO = require('./events-dao'),
    ResponseHandler = require('../common/generic-response-handler');

exports.list = {
    handler: function (request, reply) {
        var handler = new ResponseHandler(reply);
        eventsDAO.list().then(handler.success, handler.error);
    }
};

exports.create = {
    handler: function(request, reply) {
        var handler = new ResponseHandler(reply);
        eventsDAO.create(request.payload).then(handler.success, handler.error);
    },
    validate: {
        payload: {
            start: Joi.string().required().min(3),
            end: Joi.string().required().min(0),
            allDay: Joi.number().required(),
            subject: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required()
        }
    }
};

exports.update = {
    handler: function(request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        eventsDAO.update(id, request.payload).then(handler.success, handler.error);
    },
    validate: {
        payload: {
            start: Joi.string().required().min(3),
            end: Joi.string().required().min(0),
            allDay: Joi.number().required(),
            subject: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required()
        },
        params: {
            id: Joi.number().required().min(0)
        }
    }
};

exports.delete = {
    handler: function(request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        eventsDAO.delete(id).then(handler.success, handler.error);
    },
    validate: {
        params: {
            id: Joi.number().required().min(0)
        }
    }
};

