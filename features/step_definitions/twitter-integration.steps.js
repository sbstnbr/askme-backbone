'use strict';

var assert = require('assert');
var webdriverio = require('webdriverio');
var options = {};

var fs = require('fs');

module.exports = function() {

  this.Given(/^I have entered a feedback$/, function (callback) {
    webdriverio
      .remote(options)
      .init()
      .url('http://localhost:9999')
      .execute(function() { localStorage.setItem('userName', 'Testing User'); })
      .waitForVisible('.questionItem', 3000)
      .setValue('#question-textarea', 'This is my new question')
      .submitForm('#addQuestionForm')
      .end(function() { callback() });
  });

  this.When(/^I press the Tweet button$/, function (callback) {
    webdriverio
      .remote(options)
      .init()
      .url('http://localhost:9999')
      .waitForVisible('.questionItem', 3000)
      .click('#twitter-button')
      .end(function() { callback() });
  });

  this.Then(/^I should see a tweet with my question ready to be tweeted$/, function (callback) {
    webdriverio
      .remote(options)
      .init()
      .url('https://twitter.com/intent/tweet?text=This%20is%20my%20new%20question&hashtags=LAS')
      .waitForVisible('.button', 3000)
      .end(function() { callback() });
  });
}
