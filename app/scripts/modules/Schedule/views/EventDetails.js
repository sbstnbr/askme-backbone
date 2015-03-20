define([
    'underscore',
    'backbone',
    'templates',
    'socket',
    'modules/Schedule/models/Event'
], function (_, Backbone, JST, socket, Event) {
    'use strict';

    return Backbone.View.extend({
        el: $('.reveal-modal > .dialog > .content')[0],
        template: JST['app/templates/event-details.hbs'],
        collectionTemplate: JST['app/templates/event-presenters.hbs'],

        render: function() {
            var that = this;

            if (_.isEmpty(this.event)) {
                throw 'No scheduled event selected to render';
            }

            var id = this.event.id;

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
            this.event.start = $.fullCalendar.formatDate(this.event.start, dateFormat);
            this.event.end = $.fullCalendar.formatDate(this.event.end, dateFormat);

            this.$el
                .html(this.template(this.event))
                .parents('.reveal-modal').foundation('reveal', 'open');

            var average = this.event.average;

            if((average >= 1) && (average < 2)) {
                this.$el.find('#star1').attr('checked', true);
            }
            if((average >= 2) && (average < 3)) {
                this.$el.find('#star2').attr('checked', true);
            }
            if((average >= 3) && (average < 4)) {
                this.$el.find('#star3').attr('checked', true);
            }
            if((average >= 4) && (average < 5)) {
                this.$el.find('#star4').attr('checked', true);
            }
            if(average >= 5) {
                this.$el.find('#star5').attr('checked', true);
            }
            return this;
        },
        events: {
            'click .votePositive': 'addOneVote'
        },
        addOneVote: function (evt) {
            console.log('vote positive');
            var id = $(evt.currentTarget).data('id');
            var value = $(evt.currentTarget).data('value');
            $.ajax({
                url: 'api/events/' + id + '/vote/' + value,
                method: 'PUT'
            }).done(function () {
                console.log('successful');
            });
        }
    });
});
