angular.module('SOSapp').controller('clusterController',['$scope','$timeout','ClusterService', '$pusher',
    function( $scope,$timeout,ClusterService, $pusher) {

    $scope.map;
    $scope.markers = [];
    $scope.markerId = 1;



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

        var locations = [];
        var client = new Pusher("93c03fd6dd15021f034f",{
            cluster: 'ap2',
            encrypted: true
        });
        var pusher = $pusher(client);
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            console.log(data.location);
            locations.push(data.location);
            addClustor(locations);
        });

    //     $timeout(function(){
    //
    //     var latlng = new google.maps.LatLng(7.8731, 80.7718);
    //     var myOptions = {
    //         zoom: 3,
    //         center: latlng,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    //     $scope.overlay = new google.maps.OverlayView();
    //     $scope.overlay.draw = function() {}; // empty function required
    //     $scope.overlay.setMap($scope.map);
    //     $scope.element = document.getElementById('map_canvas');
    //
    //     //addClustor();
    //
    // },100);



    function addClustor(locations){

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
                var content = "<div style='color: red;font-weight: 900'>Severity Level : " + locations[i]["severity"] + "</div>";

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


}]);