var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/contacts_test';
require(__dirname + '/../server');

var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');

var testUsers = [{username: 'testUser1'}, {username: 'testUser2'}];

function createTestUsers(testUserArray, cb) {
  testUserArray.forEach(function(user) {
    chai.request('localhost:3000')
      .post('/api/users')
      .send(user)
      .end(function(err,res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('username');
      });
  });
  cb();
}

function getUsers(cb) {
  chai.request('localhost:3000')
    .get('/api/users')
    .end(function(err, res) {
      expect(err).to.eql(null);
      cb(res.body);
    });
}

describe('contacts router', function() {
  before(function(done) {
    createTestUsers(testUsers, function() {
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should search contacts', function(done) {
    var search = '1';
    chai.request('localhost:3000')
      .post('/api/contacts/search')
      .send({search: search})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0].username).to.eql('testUser1');
        done();
      });
  });

  it('should send contact request', function(done) {
    getUsers(function(users) {
      var reqBody = {
        userId: users[0]._id,
        contactId: users[1]._id
      };
      chai.request('localhost:3000')
        .post('/api/contacts/add')
        .send(reqBody)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('contact');
          done();
        });
    });
  });

  it('should accept a contact request', function(done) {
    getUsers(function(users) {
      var reqBody = {
        requesterId: users[0]._id,
        userId: users[1]._id
      };
      chai.request('localhost:3000')
        .post('/api/contacts/confirm')
        .send(reqBody)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('requester');
          done();
        });
    });
  });
});
