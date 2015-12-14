var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name    : String,
  deviceId: Number,
  location: Number,
  contacts: [{type: ObjectId, ref: 'User'}],
});

var User = module.exports.User = mongoose.model('User', userSchema);
