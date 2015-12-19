require(__dirname + '/../www/js/bundle');
require('angular-mocks');

var templates = ['checkin.html', 'map.html', 'panic.html', 'search.html',
'home-menu.html', 'contacts.html', 'auth_form.html'];

describe('contacts controller', function() {
  var $httpBackend;
  var $ControllerContstructor;
  var $scope;

  function setupHttp(templates) {
    templates.forEach(function(template) {
      $httpBackend.when('GET', 'templates/' + template).respond(200, 'thanks');
    });
  }

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
      setupHttp(templates);
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

    it('should accept a contact request', function() {
      var requester = {username: 'test requester', _id: '435'};
      $scope.currentUser = {username: 'test user', id: '123'};
      $httpBackend.expectPUT('http://localhost:3000/api/contacts/confirm', {
        userId: $scope.currentUser.id,
        requesterId: requester._id
      })
        .respond(200, {requester: {username: 'test'}});
      $scope.acceptRequest(requester);
      $httpBackend.flush();
    });

    it('should search for contacts', function() {
      $scope.searchParam = 'test';
      $httpBackend.expectPOST('http://localhost:3000/api/contacts/search', {
        search: $scope.searchParam
      })
        .respond(200, ['search', 'results']);
      $scope.search();
      $httpBackend.flush();
      expect($scope.searchResults[0]).toBe('search');
      expect($scope.searchResults[1]).toBe('results');
    });

    it('should make a contact request', function() {
      var contact = {username: 'test1', _id: '123'};
      $scope.currentUser = {username: 'test user', id: '4567'};
      $scope.currentUser.contacts = [];
      $httpBackend.expectPUT('http://localhost:3000/api/contacts/add', {
        userId: $scope.currentUser.id,
        contactId: contact._id
      })
        .respond(200, {contact: {username: 'test1', _id: '123'}});
      $scope.makeRequest(contact);
      $httpBackend.flush();
    });

    it('should clear search', function() {
      $httpBackend.flush();
      $scope.searchParam = 'test';
      $scope.searchResults = ['one', 'two'];
      $scope.clearSearch();
      expect($scope.searchParam).toBe('');
      expect($scope.searchResults.length).toBe(0);
    });
  });
});
