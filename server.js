var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/catch_dev');

//var catchRouter = require(__dirname + '/routes/catch_routes');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

//app.use('/api', catchRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
