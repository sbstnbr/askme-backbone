var Joi = require('joi'),
    eventsDAO = require('./events-dao'),
    ResponseHandler = require('../common/generic-response-handler');

exports.list = {
    handler: function (request, reply) {
        var handler = new ResponseHandler(reply);
        eventsDAO.list().then(handler.success, handler.error);
    }
};

exports.findPresenters = {
    handler: function(request, reply) {
        var handler = new ResponseHandler(reply);
        eventsDAO.findPresenters(request.params.id)
                .then(handler.success, handler.error);
    },
    validate: {
        params: {
            id: Joi.number().required().min(0)
        }
    }
}

exports.create = {
    handler: function (request, reply) {
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
exports.get = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        eventsDAO.get(id).then(handler.success, handler.error);
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
        eventsDAO.update(id, request.payload)
            .then(function (data) {
                return eventsDAO.get(id);
            })
            .then(handler.success, handler.error);
    },
    validate: {
        payload: {
            id: Joi.number(),
            start: Joi.string().required().min(3),
            end: Joi.string().required().min(0),
            allDay: Joi.number().required(),
            subject: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required(),
            votes: Joi.number().required().min(0),
            value: Joi.number().required().min(0),
            average: Joi.number().required().min(0)
        },
        params: {
            id: Joi.number().required().min(0)
        }
    }
};

exports.vote = {
    handler: function (request, reply) {
        var id = request.params.id;
        var handler = new ResponseHandler(reply);
        eventsDAO.get(id)
            .then(function (doc) {
                var votes = doc.votes + request.params.value;
                doc.votes = votes;
                doc.value = doc.value + 1;
                doc.average = doc.votes / doc.value;
                return eventsDAO.update(id, doc)
            })
            .then(function () {
                return eventsDAO.get(id);
            })
            .then(handler.success, handler.error);

    },
    validate: {
        params: {
            id: Joi.number().required().min(0),
            value: Joi.number().required().min(0)
        }
    }
};

exports.delete = {
    handler: function (request, reply) {
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
