define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: 'api/questions',
        handleVoteButtons: function () {
            var votes = JSON.parse(localStorage.questions)[this.get('id')];
            if(votes === 0) {
                this.unset('upvoteDisabled');    
                this.unset('downvoteDisabled');
            } 
            if(votes === 1) {
                this.set('upvoteDisabled', true);
            }
            if(votes === -1) {
                this.set('downvoteDisabled', true);
            }
        }
    });
});