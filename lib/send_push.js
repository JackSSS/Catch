var request = require('superagent');
var config = require(__dirname + '/../.env');

module.exports = function(deviceIds, message, cb) {
  request
    .post('https://push.ionic.io/api/v1/push')
    .set('Content-Type', 'application/json')
    .set('X-Ionic-Application-Id', config.ionicAppId)
    .auth(config.ionicApiKey)
    .send({
      tokens: deviceIds,
      notification: {
        alert: message
      }
    })
    .end(function(error, response) {
      if (error) return cb(error);

      cb(null, response);
    });
};
