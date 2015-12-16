var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var decryptUser	= require(__dirname + '/../lib/decrypt_user');
var handleError = require(__dirname + '/../lib/handle_server_error');
var basicHttp = require(__dirname + '/../lib/basic_http_auth');

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
authRouter.get('/signin', basicHttp, function(req, res) {
	if(!(req.auth.username && req.auth.password)) {
		console.log('no authentication found on request object');
		return res.status(401).json({
			msg: 'Authentication failed, you dirty old bastard'
		});
	}

	User.findOne({'auth.basic.username': req.auth.username}, function(err, foundUser) {
		if(err) {
			console.log('user lookup error');
			console.log(err);
			return res.status(401).json({
				msg: 'Authentication failed, what\'s your REAL name?'
			});
		}

		if(!foundUser) {
			console.log('user not found');
			console.log(err);
			return res.status(401).json({
				msg: 'Cannot authenticate, you amorphous pile of goo.'
			});
		}

		if(!foundUser.checkPW(req.auth.password)) {
			console.log('incorrect password provided');
			return res.status(401).json({
				msg: 'Authentication not possible, wtf you liar'
			});
		}

		foundUser.genToken(function(err, token) {
			res.json({token: token});
		});
	});
});


authRouter.get('/user', decryptUser, function(req, res) {
	res.json({
		username: req.user.username,
		deviceId: req.user.deviceId,
		location: req.user.location,
		contacts: req.user.contacts
	});
});