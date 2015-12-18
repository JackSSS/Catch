module.exports = function(app) {
  app.controller('PushNotificationController', ['$scope', '$http', function($scope, $http) {

    $scope.pushNotification = function() {
      $http.post('/push', function(req, res) {
        res.header('Content-Type', 'application/json');
        res.header('X-Ionic-Application-Id', 'fae31fd1');
          request({
            "url":'https://push.ionic.io/api/v1/push',
            "method": "POST",
            "json": {
              "tokens":[
                "DJVhfojOh6xsGjjHdEqnfr%2Fd%2BCGg15sUVoCYHI7hXdpQ"
              ],
              "notification":{
                "alert":"A push notification!"
              }
            }
          }),
      }
    }

  }]);
};
