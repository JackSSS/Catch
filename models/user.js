var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name    : String,
  deviceId: Number,
  location: Number
});

var User = module.exports.User = mongoose.model('User', userSchema);
