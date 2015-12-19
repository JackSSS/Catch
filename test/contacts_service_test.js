require(__dirname + '/../www/js/bundle');
require('angular-mocks');

describe('Contacts Service', function() {
  var $httpBackend;
  var Contacts;

  beforeEach(angular.mock.module('catch'));

  beforeEach(angular.mock.inject(function(_Contacts_) {
    Contacts = _Contacts_;
  }));

  it('should inject service', function() {
    expect(typeof Contacts).toBe('object');
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
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

    it('should get all contacts', function(done) {
      $httpBackend.flush();
      var userId = '123';
      $httpBackend.expectGET('http://localhost:3000/api/contacts/123')
        .respond(200, []);
      Contacts.getAll(userId, function(err, data) {
        expect(err).toBe(null);
        expect(Array.isArray(data)).toBe(true);
        done();
      });
      $httpBackend.flush();
    });
  });
});
