var GoogleMapsLoader = require('google-maps');

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
