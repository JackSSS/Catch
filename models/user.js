var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  name    : String,
	username: String,
  deviceId: Number,
  location: Number,
  contacts: Array,
  auth: {
  	basic: {
  		username: String,
  		password: String
  	}
  }
});

userSchema.methods.hashPW = function(pw) {
  console.log('hashing: ' + pw);
	var hash = this.auth.basic.password = bcrypt.hashSync(pw, 8);
	return hash;
};

userSchema.methods.checkPW = function(pw) {
	return bcrypt.compareSync(pw, this.auth.basic.password);
};

userSchema.methods.genToken = function(cb) {
	var id = this._id;
	eat.encode({id: id}, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
