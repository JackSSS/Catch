require(__dirname + '/../www/js/bundle');
require('angular-mocks');

describe('contacts controller', function() {
  var $httpBackend;
  var $ControllerContstructor;
  var $scope;

  beforeEach(angular.mock.module('catch'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerContstructor = $controller;
  }));

  it('should create a controller', function() {
    var controller = $ControllerContstructor('ContactsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerContstructor('ContactsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all contacts', function() {
      $scope.currentUser = {
        id: '123'
      };
      $httpBackend.expectGET('http://localhost:3000/api/contacts/' + $scope.currentUser.id)
        .respond(200, [{_id: 1, username: 'test contact'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.contacts[0].name).toBe('test contact');
    });
  });
});
