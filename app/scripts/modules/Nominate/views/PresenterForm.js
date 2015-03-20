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
            var errors = this.$el.find('.error');
            _.forEach(errors, function(error) {
                $(error).removeClass('error');
                $(error).closest('small').remove();
            });

            var inputs = this.$el.find('input');
            
            for(var i = 0 ; i < inputs.length; i++) {
                if($(inputs[i]).val().length < 3 ) {
                    var label = $(inputs[i]).closest('label');
                    if(label.children('.error').length === 0 ) {
                        label.addClass('error');
                        label.append('<small class="lbl-small error">Please fill this out</small>');
                    }
                    
                    return;
                }
    
            }

            var id = this.model.id;
            var that = this;

            console.log('input1: ', inputs[0]);
            console.log('input2: ', inputs[1]);

            this.model.clear();
            this.model.set({explenation: $(inputs[0]).val(), nominator: $(inputs[1]).val()});
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
