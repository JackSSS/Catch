var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var decryptUser	= require(__dirname + '/../lib/decrypt_user');
var handleError = require(__dirname + '/../lib/handle_server_error');
// var basicHttp = require(__dirname + '/../lib/basic_http_auth');

var authRouter = module.exports = express.Router();

authRouter.post('/signup', bodyParser.json(), function(req, res) {
	var user = new User();
	user.auth.basic.username = req.body.username;
	user.username = req.body.username;
	user.hashPW(req.body.password);

	user.save(function(err, savedUser) {
		if(err) return handleError(err, res);
		savedUser.genToken(function(err, token) {
			res.json({token: token});
		});
	});
});

// TODO: Add signin route

authRouter.get('/user', decryptUser, function(req, res) {
	res.json({
		username: req.user.username,
		deviceId: req.user.deviceId,
		location: req.user.location,
		contacts: req.user.contacts
	});
});