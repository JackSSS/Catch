var handleSuccess = function(cb) {
  return function(res) {
    cb(null, res.data);
  };
};

var handleFail = function(cb) {
  return function(err) {
    cb(err.data);
  };
};

module.exports = function(app) {

  app.factory('Contacts', function($http) {
    var contacts = {};

    contacts.getAll = function(userId, cb) {
      $http.get(SERVER_ADDRESS + '/api/contacts/' + userId)
        .then(handleSuccess(cb), handleFail(cb));
    };

    contacts.acceptRequest = function(user, requester, cb) {
      $http.post(SERVER_ADDRESS + '/api/contacts/confirm', {
        userId: user.id,
        requesterId: requester._id
      })
        .then(handleSuccess(cb), handleFail(cb));
    };

    contacts.search = function(param, cb) {
      $http.post(SERVER_ADDRESS + '/api/contacts/search', {search: param})
        .then(handleSuccess(cb), handleFail(cb));
    };

    contacts.makeRequest = function(user, contact, cb) {
      $http.post(SERVER_ADDRESS + '/api/contacts/add', {
        userId: user.id,
        contactId: contact._id
      })
        .then(handleSuccess(cb), handleFail(cb));
    };

    return contacts;
  });
};
