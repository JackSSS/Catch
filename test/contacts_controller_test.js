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
      $httpBackend.when('GET', 'templates/checkin.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/map.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/panic.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/search.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/home-menu.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/contacts.html').respond(200, 'thanks');
      $httpBackend.when('GET', 'templates/auth_form.html').respond(200, 'thanks');
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
        .respond(200, {
          contacts: [{_id: 1, username: 'test contact'}],
          receivedRequests: ['456']
        });
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.contacts[0].username).toBe('test contact');
      expect($scope.receivedRequests[0]).toBe('456');
    });
  });
});
