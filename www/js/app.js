require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var catchApp = angular.module('catch', ['ionic', 'ngCordova', 'ngCookies', 'base64']);

require('./controllers/controllers')(catchApp);
require('./directives/directives')(catchApp);


catchApp.run(function($ionicPlatform, $cordovaGeolocation, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000
    };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      $rootScope.lat = position.coords.latitude;
      $rootScope.lng = position.coords.longitude;
    }, function(err) {
      console.log(err);
    });
  });
});

catchApp.config(function($stateProvider, $urlRouterProvider) {

  // routing for login and signup
  $stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl: 'templates/auth_form.html',
    });

  // routing for home
  $stateProvider
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'templates/home-menu.html',
      // controller: 'AppCtrl'
    })

    .state('home.contacts', {
      url: '/contacts',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/contacts.html',
          controller: 'ContactsController'
        }
      }
    })

    .state('home.search', {
      url: '/search',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchController'
        }
      }
    })

    .state('home.panic', {
      url: '/panic',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/panic.html',
          controller: 'PanicCtrl'
        }
      }
    })

    .state('home.map', {
      url: '/map',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/map.html'
        }
      }
    })

    .state('home.checkin', {
      url: '/checkin',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/checkin.html',
          controller: 'CheckinCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth');
});
