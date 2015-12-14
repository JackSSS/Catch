angular.module('catch.directives', [])

.directive('errorList', function() {
  return {
    restrict: 'AC',
    replace: true,
    templateUrl: 'templates/error_list.html',
    scope: {
      errors: '='
    }
  };
})
