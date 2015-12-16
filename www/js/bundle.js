/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = window.angular;

	var catchApp = angular.module('catch', ['ionic', 'ngCordova']);

	__webpack_require__(1)(catchApp);
	__webpack_require__(4)(catchApp);


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
	          templateUrl: 'templates/checkin.html'
	        }
	      }
	    });
	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/auth');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(2)(app);
	  __webpack_require__(3)(app);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(app) {

	  app.controller('AuthCtrl', function($scope, $timeout, $location, $ionicLoading) {

	    // With the new view caching in Ionic, Controllers are only called
	    // when they are recreated or on app start, instead of every page change.
	    // To listen for when this page is active (for example, to refresh data),
	    // listen for the $ionicView.enter event:
	    //$scope.$on('$ionicView.enter', function(e) {
	    //});

	    // Form data for the login modal
	    $scope.authErrors = [];
	    $scope.user = {};
	    $scope.signup = true;

	    $scope.toggleSignup = function() {

	      if ($scope.signup)
	        $scope.signup = false;
	      else
	        $scope.signup = true;

	      $scope.authErrors = [];
	      $scope.user = {};
	    };

	    $scope.authenticate = function(user) {
	      $scope.authErrors = [];

	      if (!(user.username && user.password))
	        return $scope.authErrors.push('Please enter username and password.');

	      console.log('Authenticating', $scope.user);
	      $ionicLoading.show({
	        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Signing up...'
	      });
	      // Simulate a login delay. Remove this and replace with your login
	      // code if using a login system
	      $location.path('/home/panic');
	      $ionicLoading.hide();
	    };

	    $scope.logout = function() {

	      $location.path('/auth');
	    };
	  });
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(app) {
	  app.controller('UsersController', ['$scope', '$http', function($scope, $http) {
	    $scope.users = [];
	    $scope.errors = [];
	    $scope.newUser = null;

	    $scope.getAll = function() {
	      $http.get('/api/user')
	        .then(function(res) {
	          $scope.users = res.data;
	        }, function(err) {
	          console.log(err.data);
	        });
	    };

	    $scope.create = function(user) {
	      $http.post('/api/user', user)
	        .then(function(res) {
	          $scope.users.push(res.data);
	          $scope.newUser = null;
	        }, function(err) {
	          console.log(err.data)
	        });
	    };

	    $scope.update = function(user) {
	      user.editing = false;
	      $http.put('/api/user/' + user._id, user)
	        .then(function(res) {
	          console.log('this user has a been modified');
	        }, function(err) {
	          $scope.errors.push('could not get user: ' + user.name);
	          console.log(err.data);
	        });
	    };

	    $scope.remove = function(user) {
	      $scope.users.splice($scope.users.indexOf(user), 1);
	      $http.delete('/api/user/' + user._id)
	        .then(function(res) {
	          console.log('user deleted');
	        }, function(err) {
	          console.log(err.data);
	          $scope.errors.push('could not delete user: ' + user.name);
	          $scope.getAll();
	        });
	    };
	  }]);
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(5)(app);
	  __webpack_require__(6)(app);
	};



/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var GoogleMapsLoader = __webpack_require__(7);

	function createMap(google, lat, lng, zoom, element) {
	  var myLatLng = new google.maps.LatLng(lat, lng);
	  var mapOptions = {
	    zoom: zoom,
	    center: myLatLng
	  };
	  var map = new google.maps.Map(element[0], mapOptions);

	  var marker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
	    draggable: false
	  });
	}

	module.exports = function(app) {

	  app.directive('map', function($rootScope) {
	    return {
	      restrict: 'AC',
	      link: function(scope, element, attrs) {

	        var zoom = 16;
	        var lat = $rootScope.lat;
	        var lng = $rootScope.lng;

	        GoogleMapsLoader.load(function(google) {
	          createMap(google, lat, lng, zoom, element);
	        });
	      }
	    };
	  });
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

		if (root === null) {
			throw new Error('Google-maps package can be used only in browser');
		}

		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.GoogleMapsLoader = factory();
		}

	})(typeof window !== 'undefined' ? window : null, function() {


		'use strict';


		var googleVersion = '3.18';

		var script = null;

		var google = null;

		var loading = false;

		var callbacks = [];

		var onLoadEvents = [];

		var originalCreateLoaderMethod = null;


		var GoogleMapsLoader = {};


		GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

		GoogleMapsLoader.KEY = null;

		GoogleMapsLoader.LIBRARIES = [];

		GoogleMapsLoader.CLIENT = null;

		GoogleMapsLoader.CHANNEL = null;

		GoogleMapsLoader.SENSOR = null;

		GoogleMapsLoader.LANGUAGE = null;

		GoogleMapsLoader.VERSION = googleVersion;

		GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


		GoogleMapsLoader._googleMockApiObject = {};


		GoogleMapsLoader.load = function(fn) {
			if (google === null) {
				if (loading === true) {
					if (fn) {
						callbacks.push(fn);
					}
				} else {
					loading = true;

					window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
						ready(fn);
					};

					GoogleMapsLoader.createLoader();
				}
			} else if (fn) {
				fn(google);
			}

			var promiseError = function() {
				throw new Error('Using promises is not supported anymore. Please take a look in new documentation and use callback instead.');
			};

			return {
				then: promiseError,
				'catch': promiseError,
				fail: promiseError
			};
		};


		GoogleMapsLoader.createLoader = function() {
			script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = GoogleMapsLoader.createUrl();

			document.body.appendChild(script);
		};


		GoogleMapsLoader.isLoaded = function() {
			return google !== null;
		};


		GoogleMapsLoader.createUrl = function() {
			var url = GoogleMapsLoader.URL;

			url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

			url += '&sensor=' + ((GoogleMapsLoader.SENSOR === true || GoogleMapsLoader.SENSOR === 'true') ? 'true' : 'false');

			if (GoogleMapsLoader.KEY) {
				url += '&key=' + GoogleMapsLoader.KEY;
			}

			if (GoogleMapsLoader.LIBRARIES.length > 0) {
				url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
			}

			if (GoogleMapsLoader.CLIENT) {
				url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
			}

			if (GoogleMapsLoader.CHANNEL) {
				url += '&channel=' + GoogleMapsLoader.CHANNEL;
			}

			if (GoogleMapsLoader.LANGUAGE) {
				url += '&language=' + GoogleMapsLoader.LANGUAGE;
			}

			return url;
		};


		GoogleMapsLoader.release = function(fn) {
			var release = function() {
				GoogleMapsLoader.KEY = null;
				GoogleMapsLoader.LIBRARIES = [];
				GoogleMapsLoader.CLIENT = null;
				GoogleMapsLoader.CHANNEL = null;
				GoogleMapsLoader.LANGUAGE = null;
				GoogleMapsLoader.SENSOR = false;
				GoogleMapsLoader.VERSION = googleVersion;

				google = null;
				loading = false;
				callbacks = [];
				onLoadEvents = [];

				if (typeof window.google !== 'undefined') {
					delete window.google;
				}

				if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
					delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
				}

				if (originalCreateLoaderMethod !== null) {
					GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
					originalCreateLoaderMethod = null;
				}

				if (script !== null) {
					script.parentElement.removeChild(script);
					script = null;
				}

				fn();
			};

			if (loading) {
				GoogleMapsLoader.load(function() {
					release();
				});
			} else {
				release();
			}
		};


		GoogleMapsLoader.onLoad = function(fn) {
			onLoadEvents.push(fn);
		};


		GoogleMapsLoader.makeMock = function() {
			originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

			GoogleMapsLoader.createLoader = function() {
				window.google = GoogleMapsLoader._googleMockApiObject;
				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
			};
		};


		var ready = function(fn) {
			var i;

			loading = false;

			if (google === null) {
				google = window.google;
			}

			for (i = 0; i < onLoadEvents.length; i++) {
				onLoadEvents[i](google);
			}

			if (fn) {
				fn(google);
			}

			for (i = 0; i < callbacks.length; i++) {
				callbacks[i](google);
			}

			callbacks = [];
		};


		return GoogleMapsLoader;

	});


/***/ }
/******/ ]);