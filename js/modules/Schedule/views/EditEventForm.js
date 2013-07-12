define([
    'underscore',
    'backbone',
    'text!/templates/edit-event.tpl.html',
    'text!/templates/edit-event-attendee.tpl.html',
], function(_, Backbone, EditEventTemplate, EditAttendeeTemplate) {
    'use strict';

    return Backbone.View.extend({
        el: $('.contentWrapper'),

        template: _.template(EditEventTemplate),

        render: function() {
            this.$el.html(this.template({ model: this.model, attendeeTemplate: EditAttendeeTemplate }));
            return this;
        },

        clear: function() {
            this.$el.html('');
        },

        addAttendee: function(evt) {
            evt.preventDefault();
            console.log('add attendee');
        },

        events: {
            'click a.addAttendee': 'addAttendee',
            submit: 'save'
        },

        save: function(evt) {
            evt.preventDefault();
            console.log('save data');
        }
    });
});
