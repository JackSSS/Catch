module.exports = function(app) {

  app.controller('PanicCtrl', ['$scope', '$http', '$ionicPopup', function($scope, $http, $ionicPopup) {
    $scope.alert = {};
    $scope.contactId = '';

      $scope.showAlert = function() {
        var alert = $ionicPopup.alert({
          title: 'C A T C H',
          template: 'The panic button has been pushed!',
          okType: 'button-dark'
        }).then(function(contact) {


        $http.post('/api/contacts/alert', {userId: $scope.currentUser.id, contactId: contact._id})
        }).then(function(err, res) {

          if (err) return err;

        $scope.alert.push(res.body);
      });
     };
  }]);
};
