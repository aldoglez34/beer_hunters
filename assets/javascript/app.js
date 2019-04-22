// ! when window loads
window.onload = function () {

    // hide the results
    $("#selectcontainer").hide();
    $("#currentcontainer").hide();
    $("#randomcontainer").hide();
    $("#beerhuntcontainer").hide();

    // app version
    console.log("app v33");

};

// ! beer icon thingy
// works as a home button
$("#beericon").click(function () {

    // hide and show containers accordingly
    $("#titlediv").show();
    $("#searchcontainer").show();
    $("#selectcontainer").hide();
    $("#currentcontainer").hide();
    $("#randomcontainer").hide();
    $("#beerhuntcontainer").hide();

});

// ! another location clicked
// another location option clicked
$("#select").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#selectcontainer").show(500);
});

// ! my current location clicked
// current location option clicked
$("#current").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // ? getting my current city based on my public ip

    // get my public ip
    var myPublicIpUrl = "https://api.ipify.org?";

    // ajax call to get the public ip
    $.ajax({ url: myPublicIpUrl, method: "GET" }).done(function (response) {

        // get my public ip
        var myPublicIp = response;
        console.log("my public ip: " + myPublicIp);

        // another ajax call to get the city, latitude and longitude based no the public ip
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            dataType: "json",
            data: { apiKey: "at_knMW8P4hXMF72fVn0z8jG2ZnwPsAy", ipAddress: myPublicIp }
        })
            .done(function (response) {

                // storage the respone in the html
                var mylocation = response.location;

                // update the html
                $("#cityregioncountry").text(mylocation.city + ", " + mylocation.region + ", " + mylocation.country);
                $("#latlong").text("latitude: " + mylocation.lat + ", longitude: " + mylocation.lng);

                // console stuff
                console.log("country: " + response.location.country);
                console.log("region: " + response.location.region);
                console.log("city: " + response.location.city);
                console.log("latitude : " + response.location.lat);
                console.log("longitude : " + response.location.lng);
                console.log("---------------------------------------------");

                // run the google map
                initMap(mylocation.lat, mylocation.lng);
            })
    })

    // ? google maps functions

    var map;
    var service;
    var infowindow;

    // initializing map
    function initMap(mylat, mylng) {

        var mylocation = new google.maps.LatLng(mylat, mylng);
        infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(document.getElementById("map"), { center: mylocation, zoom: 10 });

        var request = { query: "Spindletap Brewery", fields: ["name", "geometry"] };

        service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function (results, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {

                for (var i = 0; i < results.length; i++) {

                    createMarker(results[i]);
                }

                map.setCenter(results[0].geometry.location);
            }
        });
    }

    // creating marker
    function createMarker(place) {

        var marker = new google.maps.Marker({

            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {

            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function (position) {

        console.log("google maps stuff: ");
        console.log(position);

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        console.log("latitude: " + lat);
        console.log("longitude: " + lng);

        $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=false&key=AIzaSyDw8hFnyQv4weAe34Uhrba3H22o52PYXKc", function (data) {
            // console.log(data);
            // console.log(data.results[6].formatted_address);
        })
    });
    else {
        console.log("geolocation is not supported");
    }

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#currentcontainer").show(500);
});

// ! random container stuff
// random beer option event clicked
$("#random").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // show a new beer
    showRandomBeer();

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#randomcontainer").show(500);
});

// showing a new random beer
$("#nextbeer").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // show a new beer
    showRandomBeer();
});

// random beer function
let showRandomBeer = function () {

    // all locations id will be stored in this array
    var allLocationIDs = [];

    // json call to the file that contains all data
    $.getJSON("./assets/json/alldata.json", function (response) {

        // iterate all the json and store the ids
        for (i = 0; i < response.data.length; i++) {

            allLocationIDs.push(response.data[i].id);
        }

        // generate random number from 0 to the all locations lenght
        var r = Math.floor(Math.random() * allLocationIDs.length);

        // store the object from the json in a var
        var beer = response.data[r];
        console.log(beer);

        // update the html - name
        $("#r_beername").text(beer.name);

        // update the html - photo (label)
        if (beer.hasOwnProperty("labels")) {
            $("#r_beerphoto").attr("src", beer.labels.medium);
        }
        else {
            $("#r_beerphoto").attr("src", "https://bit.ly/2GzN4gH");
        }

        // update the html - description
        if (beer.hasOwnProperty("description")) {
            $("#r_beerdescription").text(beer.description);
        }
        else {
            $("#r_beerdescription").text("-");
        }

        // update the html - style
        if (beer.hasOwnProperty("style")) {
            $("#r_stylecategoryname").text(beer.style.category.name);
            $("#r_stylename").text(beer.style.name);
            $("#r_styledescription").text(beer.style.description);
        }
        else {
            $("#r_stylecategoryname").text("-");
            $("#r_stylename").text("-");
            $("#r_styledescription").text("-");
        }

        // update the html - abv
        if (beer.hasOwnProperty("abv")) {
            $("#r_abv").text(beer.abv);
        }
        else {
            $("#r_abv").text("-");
        }

        // update the html - ibu
        if (beer.hasOwnProperty("ibu")) {
            $("#r_ibu").text(beer.ibu);
        }
        else {
            $("#r_ibu").text("-");
        }

        // update the html - available
        if (beer.hasOwnProperty("available")) {
            $("#r_availability").text(beer.available.name + " / " + beer.available.description);
        }
        else {
            $("#r_availability").text("-");
        }

        // beer location
        var locationID;

        // json call to the master file to get the location id
        $.getJSON("./assets/json/master.json", function (master) {

            // iterate the data
            for (i = 1; i < master.data.length; i++) {

                // if the beer id is found
                if (beer.id === master.data[i].C) {

                    // save the location id in a var
                    locationID = master.data[i].G;
                }
            }

            // json call to the locations file
            $.getJSON("./assets/json/locations.json", function (response) {

                // iterate the data
                for (i = 0; i < response.data.length; i++) {

                    // find the beer location id 
                    if (locationID === response.data[i].id) {

                        // update the html
                        $("#r_wheretobuy").text(response.data[i].locality + ", " + response.data[i].region);
                    }
                }
            })
        })

        // clear the aray
        allLocationIDs = [];
    })
};

// ! advanced beer hunt container stuff
$("#beerhunt").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // ? begins procedure

    function load_json_data() {

        // json call
        $.getJSON("./assets/json/beers2.json", function (array) {

            // getting the array in a var
            var data = array.data;

            // populating the first category dropdown
            for (var i = 0; i <= data.length - 1; i++) {

                if (data[i].parent_id == "0") {
                    $("#category").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                }
            }
        });
    }

    // run function for category
    load_json_data();

    // ? ends procedure

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#beerhuntcontainer").show(500);
});