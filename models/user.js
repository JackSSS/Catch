var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name    : String,
  deviceId: Number,
  location: Number,
  contacts: Array,
});

var User = module.exports.User = mongoose.model('User', userSchema);
