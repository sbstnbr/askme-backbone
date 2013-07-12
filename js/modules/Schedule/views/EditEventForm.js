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
            var attendeeTemplate = _.template(EditAttendeeTemplate),
                model = {
                    first_name: '',
                    last_name: '',
                    enterprise_id: ''
                };
            this.$el.find('.addAttendeeWrapper').before(attendeeTemplate(model));
        },

        removeAttendee: function(evt) {
            evt.preventDefault();
            $(evt.target).parent().remove();
        },

        events: {
            'click a.addAttendee': 'addAttendee',
            'click button.removeAttendee': 'removeAttendee',
            submit: 'save'
        },

        save: function(evt) {
            evt.preventDefault();
            console.log('save data');
        }
    });
});
