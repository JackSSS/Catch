module.exports = function(app) {
  require('./auth_controller')(app);
  require('./user_controller')(app);
};
