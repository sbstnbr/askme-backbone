define([
    'underscore',
    'backbone',
    'templates',
], function(_, Backbone, JST) {
    'use strict';

    return Backbone.View.extend({

        el: $('.contentWrapper'),

        template: JST['app/templates/social.hbs'],

        render: function() {
            this.$el.html(this.template({}));

            // library loaded outside the requirejs via CDN
            yam.connect.embedFeed({
                container: '#embedded-feed',
                network: "accenture.com",
                feedType: "group",
                feedId: "5406370"
            });

            yam.on('/embed/feed/loadingCompleted', function () {
                setTimeout(function () {
                    clearInterval(fixHeight);
                }, 5000);
            });

            return this;
        }
    });
});
