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

	__webpack_require__(1);
	__webpack_require__(3);
	var angular = window.angular;

	var catchApp = angular.module('catch', ['ionic', 'ngCordova', 'ngCookies', 'base64']);

	__webpack_require__(4)(catchApp);
	__webpack_require__(9)(catchApp);


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

	__webpack_require__(2);
	module.exports = 'ngCookies';


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.4.8
	 * (c) 2010-2015 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular, undefined) {'use strict';

	/**
	 * @ngdoc module
	 * @name ngCookies
	 * @description
	 *
	 * # ngCookies
	 *
	 * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.
	 *
	 *
	 * <div doc-module-components="ngCookies"></div>
	 *
	 * See {@link ngCookies.$cookies `$cookies`} for usage.
	 */


	angular.module('ngCookies', ['ng']).
	  /**
	   * @ngdoc provider
	   * @name $cookiesProvider
	   * @description
	   * Use `$cookiesProvider` to change the default behavior of the {@link ngCookies.$cookies $cookies} service.
	   * */
	   provider('$cookies', [function $CookiesProvider() {
	    /**
	     * @ngdoc property
	     * @name $cookiesProvider#defaults
	     * @description
	     *
	     * Object containing default options to pass when setting cookies.
	     *
	     * The object may have following properties:
	     *
	     * - **path** - `{string}` - The cookie will be available only for this path and its
	     *   sub-paths. By default, this would be the URL that appears in your base tag.
	     * - **domain** - `{string}` - The cookie will be available only for this domain and
	     *   its sub-domains. For obvious security reasons the user agent will not accept the
	     *   cookie if the current domain is not a sub domain or equals to the requested domain.
	     * - **expires** - `{string|Date}` - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT"
	     *   or a Date object indicating the exact date/time this cookie will expire.
	     * - **secure** - `{boolean}` - The cookie will be available only in secured connection.
	     *
	     * Note: by default the address that appears in your `<base>` tag will be used as path.
	     * This is important so that cookies will be visible for all routes in case html5mode is enabled
	     *
	     **/
	    var defaults = this.defaults = {};

	    function calcOptions(options) {
	      return options ? angular.extend({}, defaults, options) : defaults;
	    }

	    /**
	     * @ngdoc service
	     * @name $cookies
	     *
	     * @description
	     * Provides read/write access to browser's cookies.
	     *
	     * <div class="alert alert-info">
	     * Up until Angular 1.3, `$cookies` exposed properties that represented the
	     * current browser cookie values. In version 1.4, this behavior has changed, and
	     * `$cookies` now provides a standard api of getters, setters etc.
	     * </div>
	     *
	     * Requires the {@link ngCookies `ngCookies`} module to be installed.
	     *
	     * @example
	     *
	     * ```js
	     * angular.module('cookiesExample', ['ngCookies'])
	     *   .controller('ExampleController', ['$cookies', function($cookies) {
	     *     // Retrieving a cookie
	     *     var favoriteCookie = $cookies.get('myFavorite');
	     *     // Setting a cookie
	     *     $cookies.put('myFavorite', 'oatmeal');
	     *   }]);
	     * ```
	     */
	    this.$get = ['$$cookieReader', '$$cookieWriter', function($$cookieReader, $$cookieWriter) {
	      return {
	        /**
	         * @ngdoc method
	         * @name $cookies#get
	         *
	         * @description
	         * Returns the value of given cookie key
	         *
	         * @param {string} key Id to use for lookup.
	         * @returns {string} Raw cookie value.
	         */
	        get: function(key) {
	          return $$cookieReader()[key];
	        },

	        /**
	         * @ngdoc method
	         * @name $cookies#getObject
	         *
	         * @description
	         * Returns the deserialized value of given cookie key
	         *
	         * @param {string} key Id to use for lookup.
	         * @returns {Object} Deserialized cookie value.
	         */
	        getObject: function(key) {
	          var value = this.get(key);
	          return value ? angular.fromJson(value) : value;
	        },

	        /**
	         * @ngdoc method
	         * @name $cookies#getAll
	         *
	         * @description
	         * Returns a key value object with all the cookies
	         *
	         * @returns {Object} All cookies
	         */
	        getAll: function() {
	          return $$cookieReader();
	        },

	        /**
	         * @ngdoc method
	         * @name $cookies#put
	         *
	         * @description
	         * Sets a value for given cookie key
	         *
	         * @param {string} key Id for the `value`.
	         * @param {string} value Raw value to be stored.
	         * @param {Object=} options Options object.
	         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
	         */
	        put: function(key, value, options) {
	          $$cookieWriter(key, value, calcOptions(options));
	        },

	        /**
	         * @ngdoc method
	         * @name $cookies#putObject
	         *
	         * @description
	         * Serializes and sets a value for given cookie key
	         *
	         * @param {string} key Id for the `value`.
	         * @param {Object} value Value to be stored.
	         * @param {Object=} options Options object.
	         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
	         */
	        putObject: function(key, value, options) {
	          this.put(key, angular.toJson(value), options);
	        },

	        /**
	         * @ngdoc method
	         * @name $cookies#remove
	         *
	         * @description
	         * Remove given cookie
	         *
	         * @param {string} key Id of the key-value pair to delete.
	         * @param {Object=} options Options object.
	         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
	         */
	        remove: function(key, options) {
	          $$cookieWriter(key, undefined, calcOptions(options));
	        }
	      };
	    }];
	  }]);

	angular.module('ngCookies').
	/**
	 * @ngdoc service
	 * @name $cookieStore
	 * @deprecated
	 * @requires $cookies
	 *
	 * @description
	 * Provides a key-value (string-object) storage, that is backed by session cookies.
	 * Objects put or retrieved from this storage are automatically serialized or
	 * deserialized by angular's toJson/fromJson.
	 *
	 * Requires the {@link ngCookies `ngCookies`} module to be installed.
	 *
	 * <div class="alert alert-danger">
	 * **Note:** The $cookieStore service is **deprecated**.
	 * Please use the {@link ngCookies.$cookies `$cookies`} service instead.
	 * </div>
	 *
	 * @example
	 *
	 * ```js
	 * angular.module('cookieStoreExample', ['ngCookies'])
	 *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {
	 *     // Put cookie
	 *     $cookieStore.put('myFavorite','oatmeal');
	 *     // Get cookie
	 *     var favoriteCookie = $cookieStore.get('myFavorite');
	 *     // Removing a cookie
	 *     $cookieStore.remove('myFavorite');
	 *   }]);
	 * ```
	 */
	 factory('$cookieStore', ['$cookies', function($cookies) {

	    return {
	      /**
	       * @ngdoc method
	       * @name $cookieStore#get
	       *
	       * @description
	       * Returns the value of given cookie key
	       *
	       * @param {string} key Id to use for lookup.
	       * @returns {Object} Deserialized cookie value, undefined if the cookie does not exist.
	       */
	      get: function(key) {
	        return $cookies.getObject(key);
	      },

	      /**
	       * @ngdoc method
	       * @name $cookieStore#put
	       *
	       * @description
	       * Sets a value for given cookie key
	       *
	       * @param {string} key Id for the `value`.
	       * @param {Object} value Value to be stored.
	       */
	      put: function(key, value) {
	        $cookies.putObject(key, value);
	      },

	      /**
	       * @ngdoc method
	       * @name $cookieStore#remove
	       *
	       * @description
	       * Remove given cookie
	       *
	       * @param {string} key Id of the key-value pair to delete.
	       */
	      remove: function(key) {
	        $cookies.remove(key);
	      }
	    };

	  }]);

	/**
	 * @name $$cookieWriter
	 * @requires $document
	 *
	 * @description
	 * This is a private service for writing cookies
	 *
	 * @param {string} name Cookie name
	 * @param {string=} value Cookie value (if undefined, cookie will be deleted)
	 * @param {Object=} options Object with options that need to be stored for the cookie.
	 */
	function $$CookieWriter($document, $log, $browser) {
	  var cookiePath = $browser.baseHref();
	  var rawDocument = $document[0];

	  function buildCookieString(name, value, options) {
	    var path, expires;
	    options = options || {};
	    expires = options.expires;
	    path = angular.isDefined(options.path) ? options.path : cookiePath;
	    if (angular.isUndefined(value)) {
	      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
	      value = '';
	    }
	    if (angular.isString(expires)) {
	      expires = new Date(expires);
	    }

	    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	    str += path ? ';path=' + path : '';
	    str += options.domain ? ';domain=' + options.domain : '';
	    str += expires ? ';expires=' + expires.toUTCString() : '';
	    str += options.secure ? ';secure' : '';

	    // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
	    // - 300 cookies
	    // - 20 cookies per unique domain
	    // - 4096 bytes per cookie
	    var cookieLength = str.length + 1;
	    if (cookieLength > 4096) {
	      $log.warn("Cookie '" + name +
	        "' possibly not set or overflowed because it was too large (" +
	        cookieLength + " > 4096 bytes)!");
	    }

	    return str;
	  }

	  return function(name, value, options) {
	    rawDocument.cookie = buildCookieString(name, value, options);
	  };
	}

	$$CookieWriter.$inject = ['$document', '$log', '$browser'];

	angular.module('ngCookies').provider('$$cookieWriter', function $$CookieWriterProvider() {
	  this.$get = $$CookieWriter;
	});


	})(window, window.angular);


/***/ },
/* 3 */
/***/ function(module, exports) {

	(function() {
	    'use strict';

	    /*
	     * Encapsulation of Nick Galbreath's base64.js library for AngularJS
	     * Original notice included below
	     */

	    /*
	     * Copyright (c) 2010 Nick Galbreath
	     * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
	     *
	     * Permission is hereby granted, free of charge, to any person
	     * obtaining a copy of this software and associated documentation
	     * files (the "Software"), to deal in the Software without
	     * restriction, including without limitation the rights to use,
	     * copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the
	     * Software is furnished to do so, subject to the following
	     * conditions:
	     *
	     * The above copyright notice and this permission notice shall be
	     * included in all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	     * OTHER DEALINGS IN THE SOFTWARE.
	     */

	    /* base64 encode/decode compatible with window.btoa/atob
	     *
	     * window.atob/btoa is a Firefox extension to convert binary data (the "b")
	     * to base64 (ascii, the "a").
	     *
	     * It is also found in Safari and Chrome.  It is not available in IE.
	     *
	     * if (!window.btoa) window.btoa = base64.encode
	     * if (!window.atob) window.atob = base64.decode
	     *
	     * The original spec's for atob/btoa are a bit lacking
	     * https://developer.mozilla.org/en/DOM/window.atob
	     * https://developer.mozilla.org/en/DOM/window.btoa
	     *
	     * window.btoa and base64.encode takes a string where charCodeAt is [0,255]
	     * If any character is not [0,255], then an exception is thrown.
	     *
	     * window.atob and base64.decode take a base64-encoded string
	     * If the input length is not a multiple of 4, or contains invalid characters
	     *   then an exception is thrown.
	     */

	    angular.module('base64', []).constant('$base64', (function() {

	        var PADCHAR = '=';

	        var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	        function getbyte64(s,i) {
	            var idx = ALPHA.indexOf(s.charAt(i));
	            if (idx == -1) {
	                throw "Cannot decode base64";
	            }
	            return idx;
	        }

	        function decode(s) {
	            // convert to string
	            s = "" + s;
	            var pads, i, b10;
	            var imax = s.length;
	            if (imax == 0) {
	                return s;
	            }

	            if (imax % 4 != 0) {
	                throw "Cannot decode base64";
	            }

	            pads = 0;
	            if (s.charAt(imax -1) == PADCHAR) {
	                pads = 1;
	                if (s.charAt(imax -2) == PADCHAR) {
	                    pads = 2;
	                }
	                // either way, we want to ignore this last block
	                imax -= 4;
	            }

	            var x = [];
	            for (i = 0; i < imax; i += 4) {
	                b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) |
	                    (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
	                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
	            }

	            switch (pads) {
	                case 1:
	                    b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);
	                    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
	                    break;
	                case 2:
	                    b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
	                    x.push(String.fromCharCode(b10 >> 16));
	                    break;
	            }
	            return x.join('');
	        }

	        function getbyte(s,i) {
	            var x = s.charCodeAt(i);
	            if (x > 255) {
	                throw "INVALID_CHARACTER_ERR: DOM Exception 5";
	            }
	            return x;
	        }

	        function encode(s) {
	            if (arguments.length != 1) {
	                throw "SyntaxError: Not enough arguments";
	            }

	            var i, b10;
	            var x = [];

	            // convert to string
	            s = "" + s;

	            var imax = s.length - s.length % 3;

	            if (s.length == 0) {
	                return s;
	            }
	            for (i = 0; i < imax; i += 3) {
	                b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);
	                x.push(ALPHA.charAt(b10 >> 18));
	                x.push(ALPHA.charAt((b10 >> 12) & 0x3F));
	                x.push(ALPHA.charAt((b10 >> 6) & 0x3f));
	                x.push(ALPHA.charAt(b10 & 0x3f));
	            }
	            switch (s.length - imax) {
	                case 1:
	                    b10 = getbyte(s,i) << 16;
	                    x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
	                        PADCHAR + PADCHAR);
	                    break;
	                case 2:
	                    b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);
	                    x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
	                        ALPHA.charAt((b10 >> 6) & 0x3f) + PADCHAR);
	                    break;
	            }
	            return x.join('');
	        }

	        return {
	            encode: encode,
	            decode: decode
	        };
	    })());

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(5)(app);
	  __webpack_require__(6)(app);
	  __webpack_require__(7)(app);
	  __webpack_require__(8)(app);
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(app) {

	  app.controller('AuthCtrl', function($scope, $timeout, $location, $ionicLoading, $http, $cookies, $base64) {

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
	    $scope.token = '';
	    $scope.currentUser = '';

	    $scope.toggleSignup = function() {

	      if ($scope.signup)
	        $scope.signup = false;
	      else
	        $scope.signup = true;

	      $scope.authErrors = [];
	      $scope.user = {};
	    };

	    $scope.getUser = function() {
	      $scope.token = $cookies.get('token');
	      $http.defaults.headers.common.token = $scope.token;
	      $http.get('/api/user')
	        .then(function(res) {
	          $scope.currentUser = res.data.username;
	        }, function(err) {
	          console.log(err);
	        });

	    };

	    $scope.authenticate = function(user) {
	      $scope.authErrors = [];

	      if (!(user.auth.username && user.auth.password))
	        return $scope.authErrors.push('Please enter username and password.');

	      console.log('Authenticating', $scope.user);
	      $ionicLoading.show({
	        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Authenticating...'
	      });
	      // Simulate a login delay. Remove this and replace with your login
	      // code if using a login system

	      if($scope.signup) {
	        $http.post('/api/signup', user)
	          .then(function(res) {
	            $cookies.put('token', res.data.token);
	            $scope.getUser();
	            $location.path('/home/panic');
	            $ionicLoading.hide();
	          }, function(err) {
	            $scope.authErrors.push(err.data.msg);
	            console.log(err.data);
	            $ionicLoading.hide();
	          });
	      } else {
	        $http({
	          method: 'GET',
	          url: '/api/signin',
	          headers: {
	            'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
	          }
	        }).then(function(res) {
	          console.log(res);
	          $cookies.put('token', res.data.token);
	          $scope.getUser();
	          $location.path('/home/panic');
	          $ionicLoading.hide();
	        }, function(err) {
	          $scope.authErrors.push(err.data.msg);
	          console.log(err.data);
	          $ionicLoading.hide();
	        });

	      }


	      // $location.path('/home/panic');
	      // $ionicLoading.hide();
	    };

	    $scope.logout = function() {

	      $location.path('/auth');
	    };
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(app) {

	  app.controller('PanicCtrl', function($scope, $ionicPopup) {

	    $scope.showAlert = function() {
	      $ionicPopup.alert({
	        title: 'Catch',
	        template: 'The panic button has been pushed!',
	        okType: 'button-dark'
	      });
	    };
	  });
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(app) {
	  app.controller('ContactsController', ['$scope', function($scope) {
	    var data = [{ username: "jack"}, {username: "Jack Sneed"}];
	    $scope.contacts = [];
	    // $scope.errors = [];

	    $scope.getAll = function() {
	      $scope.contacts = data;
	    };

	    // $scope.update = function(user) {
	    //   user.editing = false;
	    //   $http.post('/api/user' + user._id, user)
	    //     .then(function(res) {
	    //       $scope.users.push(res.data);
	    //       $push: {contacts:
	    //         {$each: [{user._id: res.data},
	    //           {name: res.data},
	    //           {location: res.data}]
	    //         };
	    //     }, function(err) {
	    //       console.log(err.data)
	    //     });
	    //   };
	    }]);
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(app) {
	  app.controller('SearchController', ['$scope', '$http', function($scope, $http) {
	    $scope.contacts = [];
	    $scope.search = '';

	    $scope.getAll = function() {
	     $http.get('/api/users')
	        .then(function(res) {
	          $scope.contacts = res.data
	          }, function(err) {
	            console.log(err.data)
	          });
	    };

	    $scope.doSearch = function() {
	      $http.post('/api/contacts/search', {search: $scope.search.trim()})
	        .then(function(res) {
	          $scope.contacts = res.data;
	        }, function(err) {
	          console.log(err.data)
	        });

	    };

	    $scope.add = function(contact) {
	      $http.post('/api/contacts/add', contact)
	        .then(function(res) {
	          $scope.contacts.send(userId, contactId);
	        }, function(err) {
	          console.log(err.data)
	        });

	    };

	    $scope.confirm = function(contact) {
	      $http.post('/api/contacts/request', contact)
	        .then(function(res) {
	          $scope.contacts.confirm(contactId, requesterId);
	        }, function(err) {
	          console.log(err.data)
	        });

	    };

	  }]);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(10)(app);
	  __webpack_require__(11)(app);
	};



/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var GoogleMapsLoader = __webpack_require__(12);

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
/* 12 */
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