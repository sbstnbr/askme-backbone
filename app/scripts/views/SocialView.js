define([
    'underscore',
    'backbone',
    'handlebars',
    'text!../../templates/social.hbs',
], function(_, Backbone, Handlebars, SocialTemplate) {
    'use strict';

    return Backbone.View.extend({

        el: $('.contentWrapper'),

        template: Handlebars.compile(SocialTemplate),

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
