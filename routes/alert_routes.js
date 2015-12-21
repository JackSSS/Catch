var express = require('express');
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handle_server_error');
var request = require('superagent');
var config = require(__dirname + '/../config');

var contactsRouter = module.exports = exports = express.Router();

contactsRouter.post(SERVER_ADDRESS + '/api/contacts/alert', jsonParser, function(req, res) {
  var user = req.body.user;
  var contactsIds = user.contacts;

  User.find({_id: {$in: contactsIds}}, function(err, contacts) {
    if (err) return handleError(err, res);

    var deviceIds = contacts.map(function(contact) {
      return contact.deviceId;
    });

    request
      .post('https://push.ionic.io/api/v1/push')
      .set('Content-Type', 'application/json')
      .set('X-Ionic-Application-Id', config.ionicAppId)
      .auth(config.ionicApiKey)
      .send({
        tokens: deviceIds,
        notification: {
          alert: user.username + ' pushed the alert button!'
        }
      })
      .end(function(error, response) {
        if (error) return handleError(error, res);

        console.log(response.body);
        res.json(response.body);
      });
  });
});
