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

    it('should login', function() {
      $scope.loginData = {
        username: 'test',
        password: 'testpassword'
      };
      $scope.doLogin();
      expect($location.path).toHaveBeenCalledWith('/home/panic');
      expect($scope.errors.length).toBe(0);
    });

    it('should reject incomplete login', function() {
      $scope.doLogin();
      expect($scope.errors.length).toBe(1);
      expect($location.path).not.toHaveBeenCalled();
    });

    it('should sign up a user', function() {
      $scope.signupData = {
        username: 'test2',
        password: 'testpassword2',
        confirmPassword: 'testpassword2'
      };
      $scope.doSignup();
      expect($location.path).toHaveBeenCalledWith('/home/panic');
      expect($scope.errors.length).toBe(0);
    });

    it('should reject incomplete signup', function() {
      $scope.doSignup();
      expect($scope.errors.length).toBe(1);
      expect($location.path).not.toHaveBeenCalled();
    });
  });
});
