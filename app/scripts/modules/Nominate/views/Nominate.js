    define([
    'underscore',
    'backbone',
    'templates',
    'modules/Nominate/views/PresenterItem',
    'modules/Nominate/models/Presenter',
    'modules/Nominate/collections/Presenters',
    'modules/Nominate/views/Presenters'
], function(_, Backbone, JST, PresenterItem, PresenterModel, PresentersCollection, PresentersView, PresenterForm) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/nominate.hbs'],

        render: function() {
            this.$el.html(this.template({}));

            var presentersCollection = new PresentersCollection({});
            var presentersView = new PresentersView({ el: this.$el.find('.presenters'), collection: presentersCollection });

            presentersView.render();

            return this;
        },


        showMessage: function(message) {
            var success = 'success';
            if(!message.isSuccessful) {
                success = 'alert'
            }
            this.$el.find('h1').prepend('<p class="alert-box ' + success + '">' + message.text + '</p>');
        }

    });
});
