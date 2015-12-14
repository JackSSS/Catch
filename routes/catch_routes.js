var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user').User;
var handleServerError = require(__dirname + '/../lib/handle_server_error');

var userRouter = module.exports = exports = express.Router();

usersRouter.get('/users', function(req, res) {
  Note.find({}, function(err, data) {
    if (err) return handleServerError(err, res);
    res.json(data);
  });
});

usersRouter.post('/users', bodyParser.json(), function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) return handleServerError(err, res);
    res.json(data);
  });
});

usersRouter.put('/users/:id', bodyParser.json(), function(req, res) {
  var userData = req.body;
  delete userData._id;
  User.update({_id: req.params.id}, userData, function(err) {
    if (err) return handleServerError(err, res);
    res.json({msg:'Update successful!'});
  });
});

usersRouter.delete('/users/:id', function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) return handleServerError(err, res);
    res.json({msg:'Delete successful!'});
  });
});