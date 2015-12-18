require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var catchApp = angular.module('catch', ['ionic','ionic.service.core', 'ngCordova', 'ngCookies', 'base64']);

require('./services/services')(catchApp);
require('./controllers/controllers')(catchApp);
require('./directives/directives')(catchApp);
require('./routes')(catchApp);

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

    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });

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

// var push = new Ionic.Push({
//   "debug": true,
//   "onNotification": function(notification) {
//     var payload = notification.payload;
//     console.log(notification, payload);
//   },
//   "onRegister": function(data) {
//     console.log(data.token);
//   }
// });
