/**
 * @overview Contains the program's entire logic, divided into logical functions.
 * @copyright James Duran 2013
 */

/**
 * The class representing the map-plotter application.
 * @name MapPlotterApplication
 * @public
 * @class
 * @returns {object} Collection of publicly accessible methods.
 */
var MapPlotterApplication = (function() {
    /**
     * The global array of objects containing coordinates and text data
     * describing various locations across the US.
     * @private
     * @type {Array<object>}
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
            title:'Central Intelligence Agency, USA',
            content: ''
        },
        {
            lat: 0,
            lng: 0,
            title:'Paris, TX',
            content: ''
        },
        {
            lat: 0,
            lng: 0,
            title:'Zilker Park, Austin, TX',
            content: ''
        }
    ];

    /**
     * Creates a marker and InfoWindow and registers them onto the Map.
     * @private
     * @function createMarkerAndInfoWindow
     * @param {object} map - The handle for the Google Maps HTML canvas.
     * @param {object} dataObject - Contains the coordinates and text data of a location.
     */
    var createMarkerAndInfoWindow = function(map, dataObject) {
        console.log('START createMarkerAndInfoWindow()');
        console.log('Creating new marker for ' + dataObject.title +
            ' at Lat: ' + dataObject.lat + ' Lng: ' + dataObject.lng);

        // Create the marker and InfoWindow.
        var x = new google.maps.Marker({
            position: new google.maps.LatLng(dataObject.lat, dataObject.lng),
            map: map,
            title: dataObject.title
        });

        var y = new google.maps.InfoWindow({
            content: dataObject.content
        });

        // Register an even handler to open the InfoWindow when the marker is clicked.
        google.maps.event.addListener(x, 'click', function() {
            y.open(map, x);
        });

        console.log('END createMarkerAndInfoWindow()');
    };

    /**
     * Callback function that retrieves the geocoder response and creates a marker and InfoWindow.
     * @private
     * @callback geocoderRequestCallback
     * @param {object} results - The geocoder JSON response object containing results.
     * @param {object} status - The geocoder status code for the request.
     * @param {object} map - The handle for the Google Maps HTML canvas.
     * @param {object} dataObject - Contains the coordinates and text data of a location.
     */
    var geocoderRequestCallback = function(results, status, map, dataObject) {
        if(status == google.maps.GeocoderStatus.OK) {
            dataObject.lat = results[0].geometry.location.lat();
            dataObject.lng = results[0].geometry.location.lng();

            console.log('Found result for ' + dataObject.title +
                ', Lat:' + dataObject.lat +
                ' Lng: ' + dataObject.lng);

            // Format the text content to be displayed within the InfoWindow.
            dataObject.content = '<h2>' + dataObject.title + '</h2>' +
                '<p>Lat: ' + dataObject.lat +
                ' Lng: ' + dataObject.lng + '</p>';

            // Create and register the marker and InfoWindow onto the map.
            createMarkerAndInfoWindow(map, dataObject);
        }
        else {
            console.log('Could not find coordinates from title/address.');
        }
    };

    /**
     * Creates a geocoder search request to retrieve coordinates based off dataObject.title.
     * @private
     * @function requestLatLngFromTitle
     * @param {object} map - The handle for the Google Maps HTML canvas.
     * @param {object} dataObject - Contains the coordinates and text data of a location.
     */
    var requestLatLngFromTitle = function(geocoder, map, dataObject) {
        console.log('START requestLatLngFromTitle()');
        geocoder.geocode({
                'address': dataObject.title
            },
            function(results, status) {
                geocoderRequestCallback(results, status, map, dataObject);
            }
        );

        console.log('END requestLatLngFromTitle()');
    };

    return {
        /**
         * The main function that is executed upon the window loading.
         * @public
         * @function run
         */
       run: function() {
            console.log('START run()');
            // Initialize the geocoding service, to convert addresses to coords.
            var g = new google.maps.Geocoder();

            // Initialize the map and roughly center it to the middle of the US.
            var o = {
                center: new google.maps.LatLng(40.924740, -98.339904),
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            var m = new google.maps.Map(document.getElementById("map-canvas"), o);

            // For each data element look up its coordinates based of its title,
            // and create a matching marker and InfoWindow.
            for(var i = 0; i < data.length; i++)
                requestLatLngFromTitle(g, m, data[i]);

            console.log('END run()');
        }
    };
})();

/**
 * Registers an event handler to run the main function upon window loading.
 */
google.maps.event.addDomListener(window, 'load', MapPlotterApplication.run);