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
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all contacts', function(done) {
      var userId = '123';
      $httpBackend.expectGET('http://localhost:3000/api/contacts/123')
        .respond(200, []);
      Contacts.getAll(userId, function(err, data) {
        expect(err).toBe(null);
        expect(Array.isArray(data)).toBe(false);
        done();
      });
      $httpBackend.flush();
    });
  });
});
