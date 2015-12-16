module.exports = function(app) {
  require('./auth_controller')(app);
  require('./panic_controller')(app);
  require('./contacts_controller')(app);
};
