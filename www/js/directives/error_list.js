module.exports = function(app) {

  app.directive('errorList', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/error_list.html',
      scope: {
        errors: '='
      }
    };
  });
};
