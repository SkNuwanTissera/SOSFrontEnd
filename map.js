var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 7.8731, lng:80.7718},
        mapTypeId: 'terrain'
    });


    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');
    var location =
        [
            {
                lat:"",
                long:"",
                severity:"",
                photo:""

            },
            {
                lat:"",
                long:"",
                severity:"",
                photo:""
            },
            {
                lat:"",
                long:"",
                severity:"",
                photo:""
            }
         ];

        // This example uses a local copy of the GeoJSON stored at

    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';

    document.getElementsByTagName('head')[0].appendChild(script);

    map.data.setStyle({
        icon: getCircle(5)
    });
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
    };
}

function eqfeed_callback(results) {
    map.data.addGeoJson(results);
}