/**
 * Created with IntelliJ IDEA.
 * User: James
 * Date: 5/7/13
 * Time: 9:31 PM
 * To change this template use File | Settings | File Templates.
 */

var data = [
    {
        lat: 0,
        lng: 0,
        title:'Austin, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'McAllen, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'Dallas, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'San Antonio, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'Houston, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'El Paso, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'Laredo, TX',
        content: ''
    },
    {
        lat: 0,
        lng: 0,
        title:'Zilker Park, Austin, TX',
        content: ''
    }
];

var geocoder;

var getLatLngFromTitle = function(map, dataObject) {
    console.log('START getLatLngFromTitle()');
    geocoder.geocode({
            'address': dataObject.title
        },
        function(results, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                dataObject.lat = results[0].geometry.location.lat();
                dataObject.lng = results[0].geometry.location.lng();

                console.log('Found result for ' + dataObject.title +
                    ', Lat:' + dataObject.lat +
                    ' Lng: ' + dataObject.lng);

                dataObject.content = '<h2>' + dataObject.title + '</h2>' +
                    '<p>Lat: ' + dataObject.lat +
                    ' Lng: ' + dataObject.lng + '</p>';

                console.log('Creating new marker for ' + dataObject.title +
                    ' at Lat: ' + dataObject.lat + ' Lng: ' + dataObject.lng);
                var x = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: dataObject.title
                });

                var y = new google.maps.InfoWindow({
                    content: dataObject.content
                });

                google.maps.event.addListener(x, 'click', function() {
                    y.open(map, x);
                });
            }
            else {
                console.log('Could not find coordinates from title/address.');
            }
        });

    console.log('END getLatLngFromTitle()');
};

var init = function() {
    console.log('START init()');
    // Initialize the geocoding service, to convert addresses to coords.
    geocoder = new google.maps.Geocoder();

    // Initialize the map and roughly center it to the middle of the US.
    var o = {
        center: new google.maps.LatLng(40.924740, -98.339904),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var m = new google.maps.Map(document.getElementById("map-canvas"), o);

    // For each data array element, create a geo-marker and info window.
    for(var i = 0; i < data.length; i++) {
        getLatLngFromTitle(m, data[i]);
    }

    console.log('END init()');
};

google.maps.event.addDomListener(window, 'load', init);