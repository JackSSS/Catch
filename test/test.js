var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var should = chai.should();

process.env.MONGOLAB_URI = 'mongodb://localhost/user_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');

describe('user routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    var userData = {name: 'test user'};
    chai.request('localhost:3000')
      .post('/api/users')
      .send(userData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test user');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to get all the users', function(done) {
    chai.request('localhost:3000')
      .get('/api/users')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

// describe('New User', function() {
//   beforeEach(function(done) {
//     (new User({name: 'test user'})).save(function(err, data) {
//       expect(err).to.eql(null);
//       this.user = data;
//       done();
//     }.bind(this));
//   });

//   it('should be able to change a name', function(done) {
//     chai.request('localhost:3000')
//       .put('/api/users/' + this.user._id)
//       .send({name: 'newName'})
//       .end(function(err, res) {
//         expect(err).to.eql(null);
//         done();
//       });
//     });
//   });
});
