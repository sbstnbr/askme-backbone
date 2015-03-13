define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        template: JST['app/templates/presenter-form.hbs'],

        events: {
            'click .show-presenters': 'triggerBack',
            'click .nominate': 'performNomination'
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        triggerBack: function(message) {
            Backbone.trigger('PresenterFrom:show-presenters', message);
        },

        performNomination:function(event) {
            event.preventDefault();
            var input = this.$el.find('input').val();
            if(input.length < 3) {
                var label = this.$el.find('label');
                if(label.children('.error').length === 0 ) {
                    label.addClass('error');
                    label.append('<small class="lbl-small error">Please fill this out</small>');
                }
                
                return;
            }

            var id = this.model.id;
            var that = this;

            this.model.clear();
            this.model.set({explenation: input});
            this.model.save(null,
                {
                    url: this.model.url + id + '/nominate',
                    success: function(model, response, options) {
                        Backbone.trigger('PresenterFrom:show-message', { text: 'Nomination performend successfully', isSuccessful: true});
                    },
                    error: function(model, xhr, options) {
                        Backbone.trigger('PresenterFrom:show-message', { text: 'Failed to nominate presenter', isSuccessful: false});  
                    }
                }
            );
        }
    });
});
