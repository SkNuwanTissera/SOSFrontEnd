angular.module('SOSapp').controller('clusterController',['$scope','$timeout','ClusterService',
    function( $scope,$timeout,ClusterService) {

    $scope.map;
    $scope.markers = [];
    $scope.markerId = 1;

    $timeout(function(){

        var latlng = new google.maps.LatLng(7.8731, 80.7718);
        var myOptions = {
            zoom: 3,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        $scope.overlay = new google.maps.OverlayView();
        $scope.overlay.draw = function() {}; // empty function required
        $scope.overlay.setMap($scope.map);
        $scope.element = document.getElementById('map_canvas');

        addClustor();

    },100);



    function addClustor(){
        ClusterService.get().then(data => {
            $scope.data = data;
        });

        var locations = [
            {lat: 7.9731, lng: 80.7718, severity:"5", photo:"", tags:["",""]},
            {lat: 7.8731, lng: 79.7718, severity:"5", photo:"", tags:["",""]},
            {lat: 7.7731, lng: 76.7718, severity:"5", photo:"", tags:["",""]},
            {lat: 7.6731, lng: 73.7718, severity:"5", photo:"", tags:["",""]},
            {lat: -33.848588, lng: 151.209834},
            {lat: -33.851702, lng: 151.216968},
            {lat: -34.671264, lng: 150.863657},
            {lat: -35.304724, lng: 148.662905},
            {lat: -36.817685, lng: 175.699196},
            {lat: -36.828611, lng: 175.790222},
            {lat: -37.750000, lng: 145.116667},
            {lat: -37.759859, lng: 145.128708},
            {lat: -37.765015, lng: 145.133858},
            {lat: -37.770104, lng: 145.143299},
            {lat: -37.773700, lng: 145.145187},
            {lat: -37.774785, lng: 145.137978},
            {lat: -37.819616, lng: 144.968119},
            {lat: -38.330766, lng: 144.695692},
            {lat: -39.927193, lng: 175.053218},
            {lat: -41.330162, lng: 174.865694},
            {lat: -42.734358, lng: 147.439506},
            {lat: -42.734358, lng: 147.501315},
            {lat: -42.735258, lng: 147.438000},
            {lat: -43.999792, lng: 170.463352}
        ];

        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };

        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };
        var markers;
        for (var i =0; i < locations.length; i++) {
              var  elements = locations[i];
            console.log(elements);

            markers = locations.map(function(elements, i) {
                    var marker = new google.maps.Marker({
                        position: elements,
                        label: "value".i
                    });
                var content = "<div style='color: red;font-weight: 900'>Severity Level : </div>" ;

                var infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open($scope.map,marker);
                    };
                })(marker,content,infowindow));
                return marker;
            });




                }

        var markerCluster = new MarkerClusterer($scope.map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


    }

    // Adds a marker to the map.
    // function addMarker(location, map) {
    //     // Add the marker at the clicked location, and add the next-available label
    //     // from the array of alphabetical characters.
    //     var marker = new google.maps.Marker({
    //         position: location,
    //         label: labels[labelIndex++ % labels.length],
    //         map: map
    //     });
    // }

    // function drop() {
    //     for (var i =0; i < markerArray.length; i++) {
    //         setTimeout(function() {
    //             addMarkerMethod();
    //         }, i * 200);
    //     }
    // }


}]);