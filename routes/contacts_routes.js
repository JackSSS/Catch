var express = require('express');
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handle_server_error');
var request = require('superagent');
var config = require(__dirname + '/../config');

var contactsRouter = module.exports = exports = express.Router();

contactsRouter.get('/contacts/:id', function(req, res) {

  var userId = req.params.id;

  function getContacts(user) {
    var contactsIds = user.contacts;

    User.find({_id: {$in: contactsIds}}, function(err, contacts) {
      if (err) return handleError(err, res);
      getReceivedRequests(user, contacts);
    });
  }

  function getReceivedRequests(user, contacts) {
    var requestsId = user.receivedRequests;

    User.find({_id: {$in: requestsId}}, function(err, receivedRequests) {
      if (err) return handleError(err, res);
      res.json({contacts: contacts, receivedRequests: receivedRequests});
    });
  }

  User.findOne({_id: userId}, function(err, user) {
    if (err) return handleError(err, res);
    getContacts(user);
  });
});

contactsRouter.put('/contacts/add', jsonParser, function(req, res) {
  var userId = req.body.userId;
  var contactId = req.body.contactId;

  function updateContact(cb) {
    User.findOneAndUpdate({_id: contactId}, {$push: {receivedRequests: userId}},
      function(err, contact) {
        if (err) return handleError(err, res);

        cb(contact);
    });
  }

  function updateUser(contact) {
    User.findOneAndUpdate({_id: userId}, {$push: {sentRequests: contactId}},
      function(err, user) {
        if (err) return handleError(err, res);

        res.json({user: user, contact: contact});
    });
  }

  // should get back own user info and contact info
  updateContact(updateUser);
});

contactsRouter.put('/contacts/confirm', jsonParser, function(req, res) {
  var userId = req.body.userId;
  var requesterId = req.body.requesterId;

  function updateRequester(cb) {
    User.findOneAndUpdate({_id: requesterId}, {
      $pull: {sentRequests: userId},
      $push: {contacts: userId}
    }, function(err, requester) {
      if (err) return handleError(err, res);

      updateUser(requester);
    });
  }

  function updateUser(requester) {
    User.findOneAndUpdate({_id: userId}, {
      $pull: {receivedRequests: requesterId},
      $push: {contacts: requesterId}
    }, function(err, user) {
      if (err) return handleError(err, res);

      res.json({user: user, requester: requester});
    });
  }

  updateRequester(updateUser);
});

contactsRouter.post('/contacts/search', jsonParser, function(req, res) {

  if (!req.body.search)
    return res.status(411).json({msg: 'no search criteria entered'});
  var regex = new RegExp(req.body.search);
  User.find({$or: [{username: regex}, {name: regex}]}, function(err, results) {
    if (err) return handleError(err, res);

    if (results.length < 1) return res.json({msg: 'no results found'});

    res.json(results);
  });
});

contactsRouter.post('/contacts/alert', jsonParser, function(req, res) {
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
