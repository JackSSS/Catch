module.exports = function(app) {

  app.controller('PanicCtrl', ['$scope', '$ionicPopup', '$http', '$rootScope',
    function($scope, $ionicPopup, $http, $rootScope) {

      $scope.alert = function() {
        var user = $scope.currentUser;
        user.coords = {
          lat: $rootScope.lat,
          lng: $rootScope.lng
        };

        $http.post(SERVER_ADDRESS + '/api/contacts/alert', user)
          .then(function(res) {
            $ionicPopup.alert({
              title: 'C A T C H',
              template: 'The alert button has been pushed!',
              okType: 'button-dark'
            });
            console.log(res);
          }, function(err) {
            console.log(err);
          });
      };

      $scope.showAlert = function() {
        var alert = $ionicPopup.alert({
          title: 'C A T C H',
          template: 'The panic button has been pushed!',
          okType: 'button-dark'
        }).then(function(contact) {

        $http.post(SERVER_ADDRESS + '/api/contacts/alert', {userId: $scope.currentUser.id, contactId: contact._id}),
          function(err, res) {

          var deviceIds = contacts.map(function(contact) {
            return contact.deviceId;
          });

          request
            .post('https://push.ionic.io/api/v1/push')
            .set('Content-Type', 'application/json')
            .set('X-Ionic-Application-Id', config.ionicAppId)
            .auth(config.ionicApiKey)
            .send({
              tokens: deviceIds,
              notification: {
                alert: user.username + ' pushed the alert button!'
              }
            })

          }
        });
      };
  }]);
};
