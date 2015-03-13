define([
    'jquery',
    'underscore',
    'backbone',
    'modules/Nominate/views/Nominate',
    'modules/Nominate/views/PresenterForm'
], function($, _, Backbone, NominateView, PresenterFormView) {
    'use strict';

    var controller = {};
    _.extend(controller, Backbone.Events);

    controller.initialize = function() {
        controller.listenTo(Backbone, 'PresenterItem:show-detail', controller.renderDetail);
        controller.listenTo(Backbone, 'PresenterFrom:show-presenters', controller.renderPresenters);
        controller.listenTo(Backbone, 'PresenterFrom:show-message', controller.showMessage)

        controller.renderView(new NominateView);
    };

    controller.renderView = function(newView) {
        if(controller.currView) {
            controller.currView.remove();
        }

        controller.currView = newView;
        $('.contentWrapper').html(controller.currView.render().$el);
    };

    controller.renderDetail = function(model) {
        controller.renderView(new PresenterFormView({model: model}));
    };

    controller.renderPresenters = function() {
        controller.renderView(new NominateView);
    };

    controller.showMessage = function(message) {
        controller.renderPresenters();
        controller.currView.showMessage(message);
    };

    return {
        initialize: controller.initialize
    };
});
