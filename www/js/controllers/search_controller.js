module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$http', 'Contacts', '$ionicPopup',
    function($scope, $http, Contacts, $ionicPopup) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.contacts = [];
      $scope.query = '';
      $scope.userId = '';
      $scope.contactId = '';
      $scope.errors = [];
    });

    $scope.doSearch = function(param) {
      Contacts.search(param, function(err, data) {
        if (err) return err;

        if (Array.isArray(data))
          $scope.contacts = data;
        else
          $scope.errors.push(data.msg);
      });
    };

    $scope.add = function(contact) {

      $http.post('/api/contacts/add', {userId: $scope.currentUser.id, contactId: contact._id})
        .then(function(res) {
          console.log(res.data);
          // $scope.contacts = res.push();
        }, function(err) {
          console.log(err.data);
        });

      Contacts.makeRequest($scope.currentUser, contact, function(err, data) {
        if (err) return err;

        $ionicPopup.alert({
          title: 'Catch',
          template: 'Contact request sent to ' + data.contact.username,
          okType: 'button-dark'
        });
      });
    };

  }]);
};
