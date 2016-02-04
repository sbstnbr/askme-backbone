'use strict';

var assert = require('assert');
var webdriverio = require('webdriverio');
var rp = require('request-promise');

var options = {};

var fs = require('fs');

module.exports = function() {

  var session = webdriverio
    .remote(options)
    .init()
    .then(function() {
      return rp({method: 'POST', uri: 'http://localhost:8081/api/purge_database'});
    })
    .url('http://localhost:9999');

  this.Given(/^I have entered a feedback$/, function (callback) {
    session
      .execute(function() { localStorage.setItem('userName', 'Testing User'); })
      .setValue('#question-textarea', 'This is my new question')
      .submitForm('#addQuestionForm')
      .then(function() {callback();})
      .catch(callback.fail)
  });

  this.When(/^I press the Tweet button$/, function (callback) {
    session
      .click('#twitter-button')
      .then(function() {callback();})
      .catch(callback.fail)
  });

  this.Then(/^I should see a tweet with my question ready to be tweeted$/, function (callback) {
    session
      .url('https://twitter.com/intent/tweet?text=This%20is%20my%20new%20question&hashtags=LAS')
      .catch(callback.fail)
      .end(callback);
  });
}
