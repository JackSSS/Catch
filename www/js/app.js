// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('catch', ['ionic', 'catch.controllers'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // routing for login and signup
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    });

  // routing for home
  $stateProvider
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'templates/home-menu.html',
      controller: 'AppCtrl'
    })

    .state('home.contacts', {
      url: '/contacts',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/contacts.html'
        }
      }
    })

    .state('home.search', {
      url: '/search',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('home.panic', {
      url: '/panic',
      views: {
        'homeMenuContent': {
          templateUrl: 'templates/panic.html'
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
          templateUrl: 'templates/checkin.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
