define([
    'underscore',
    'backbone',
    'templates'
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        el: $('.reveal-modal > .dialog > .content')[0],

        template: JST['app/templates/event-details.hbs'],
        collectionTemplate: JST['app/templates/event-presenters.hbs'],

        render: function() {
            var that = this;

            if (_.isEmpty(this.options.event)) {
                throw 'No scheduled event selected to render';
            }

            var id = this.options.event.id;

            var Collection = Backbone.Collection.extend({url: 'api/events/'+id+'/presenters'});
            var collection = new Collection();
            collection.fetch({
                reset: true,
                success: function(collection, response, options) {
                    var presentersHTMLsection = '';
                    _.forEach(collection.models, function(presenter) {
                        presentersHTMLsection += this.collectionTemplate(presenter.attributes);
                    }, that);
                    that.$el.find('#presenters').html(presentersHTMLsection);                    
                },
                error : function(model, response, options) {
                    console.log('Error loading presetners from server');
                }
            });
            
            var dateFormat = 'dddd, hh:mm tt';
            this.options.event.start = $.fullCalendar.formatDate(this.options.event.start, dateFormat);
            this.options.event.end = $.fullCalendar.formatDate(this.options.event.end, dateFormat);

            this.$el
                .html(this.template(this.options.event))
                .parents('.reveal-modal').foundation('reveal', 'open');

            return this;
        }
    });
});
