module.exports = function(app) {

  app.directive('map', function() {
    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {

        var zoom = 8;
        var lat = 50.108333;
        var lng = -122.9425;

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
    };
  });
};
