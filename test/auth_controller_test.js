require(__dirname + '/../www/js/app');
require('angular-mocks');

describe('AuthCtrl', function() {
  var $location;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('catch'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should create a controller', function() {
    var controller = $ControllerConstructor('AuthCtrl', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  describe('signup and login functions', function() {

    beforeEach(angular.mock.inject(function($rootScope) {
      $scope = $rootScope.$new();
      $location = jasmine.createSpyObj('$location', ['path']);
      $ControllerConstructor('AuthCtrl', {$scope: $scope, $location: $location});
    }));

    it('should authenticate', function() {
      $scope.user = {
        username: 'test',
        password: 'testpassword'
      };
      $scope.authenticate($scope.user);
      expect($location.path).toHaveBeenCalledWith('/home/panic');
      expect($scope.authErrors.length).toBe(0);
    });

    it('should reject incomplete authentication', function() {
      $scope.authenticate($scope.user);
      expect($scope.authErrors.length).toBe(1);
      expect($location.path).not.toHaveBeenCalled();
    });

    it('should toggle signup', function() {
      $scope.user = {
        username: 'test2',
        password: 'testpassword2',
        confirmPassword: 'testpassword2'
      };
      $scope.signup = true;
      $scope.toggleSignup();
      expect($scope.signup).toBe(false);
      expect($scope.authErrors.length).toBe(0);
      expect($scope.user).toEqual({});
    });

  });
});
