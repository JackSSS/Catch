var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/catch_dev");

var catchRouter = require(__dirname + '/routes/catch_routes');
var authRouter = require(__dirname + '/routes/auth_routes');

process.env.APP_SECRET = process.env.APP_SECRET || 'suchmysterynoonewilleverknow';

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use(express.static(__dirname + '/www'));

app.use('/api', catchRouter);
app.use('/api', authRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server up on port: ' + port);
});
