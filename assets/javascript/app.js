window.onload = function () {

    // hide the results container
    $("#resultscontainer").hide();

};

$(".action").click(function () {

    // hide and show containers accordingly
    $("#searchcontainer").hide();
    $("#resultscontainer").show(500);

});

$("#beericon").click(function () {

    // hide and show containers accordingly
    $("#searchcontainer").show(500);
    $("#resultscontainer").hide();

});

// First: Make sure to link jQuery in html file

// Query to get current IP from IPIFY API + Console LOG
var queryIP = "https://api.ipify.org?format=json";
console.log(queryIP);

// Fixed known IP belonging to Denver Colorado, in order to use ir later for the "Select Location" logic
const fixedIP = "154.16.91.131";

// API Key for GEO API (reverse code the IP to get object with location details i.e. city, region, lat&lng, etc...)
const apiKeyIP = "at_knMW8P4hXMF72fVn0z8jG2ZnwPsAy";

// Query for GEO API + Console LOG
var queryURLGeoIP = "https://geo.ipify.org/api/v1?" + apiKeyIP + "&ipAddress=" + fixedIP + "&=json";
console.log("queryURLGeoIP: " + queryURLGeoIP);
// -------------------------------------------------------------------------------------------------------------
// Code Snippet for CURRENT LOCATION logic

// Calling currentIPLocation function for current location button, with this syntaxis one can add/include more functions to the listening event
$("#current").on("click", function(event){
    event.preventDefault();
    currentIPLocation();
});


// Function to get current location based on IP address, 1st ajax call gets IP, 2nd one reverse code the IP to get geolocation values
function currentIPLocation() {
    $.ajax({
        url: queryIP, method: "GET"
    })
        .done(function (response) {
            console.log("Current Public IP: " + response.ip);
            var currentIP = response.ip;
            $(function () {
                $.ajax({
                    url: "https://geo.ipify.org/api/v1",
                    dataType: "json",
                    data: { apiKey: apiKeyIP, ipAddress: currentIP },
                    success: function (data) {
                        console.log(data);
                        console.log("Current City: " + data.location.city);
                        console.log("Current Region: " + data.location.region);
                        console.log("Current Country: " + data.location.country);
                        console.log("Current Latitude: " + data.location.lat);
                        console.log("Current Longitude: " + data.location.lng);
                        console.log("Current Zip Code: " + data.location.postalCode);
                    }
                });
            });
        })
}

// 2 different API Keys (same one) just sintaxis purposes, from BreweryDB API
const apikey = "/?key=9968a2f544553322a8a49f3fb2916c09";
const apikey2 = "&key=9968a2f544553322a8a49f3fb2916c09";

// Partial for query from BreweryDB API
var baseURL = "https://sandbox-api.brewerydb.com/v2/";

// Complement portion for random beer query + concatenation + Console LOG
var randomBeer = "beer/random";
var queryURLrandom = baseURL + randomBeer + apikey;
console.log(queryURLrandom);
var locations = [];


// Arrays for drop down menus values
var allLocationsIds = [];
var allLocationsNames = [];
var allLocationsBreweriesNames = [];
var allLocationsLocalities = [];
var allLocationsRegions = [];
var allLocationsCountries = [];

var auxLocations = "locations";
console.log("URL to get ALL Locations: " + baseURL + auxLocations + apikey);
var queryLocationsURL = baseURL + auxLocations + apikey;

// Calling getLocations function for another location button, with this syntaxis one can add/include more functions to the listening event
$("#another").on("click", function(event) {
    event.preventDefault();
    getLocations();
});


// Function to get all locations in order to create the drop down menus to choose a beer based on a location as first filter
function getLocations() {
    $.ajax({
        url: queryLocationsURL, method: "GET"
    })
        .done(function (response) {
            console.log("Total Locations available: " + response.data.length);
            console.log(response.data);
            var newRowTitles = $("<tr>").append(
                $("<th>").text("Location ID"),
                $("<th>").text("Location Name"),
                $("<th>").text("Brewery Name"),
                $("<th>").text("Locality"),
                $("<th>").text("Region"),
                $("<th>").text("Country"),
                $("<th>").text("Latitude"),
                $("<th>").text("Longitude"),
            )
            $("#resultscontainer").append(newRowTitles);
            for (i = 0; i < response.data.length; i++) {
                var newRow = $("<tr>").append(
                    $("<td>").text(response.data[i].id),
                    $("<td>").text(response.data[i].name),
                    $("<td>").text(response.data[i].brewery.nameShortDisplay),
                    $("<td>").text(response.data[i].locality),
                    $("<td>").text(response.data[i].region),
                    $("<td>").text(response.data[i].country.isoCode),
                    $("<td>").text(response.data[i].latitude),
                    $("<td>").text(response.data[i].longitude),
                )
                $("#resultscontainer").append(newRow);
                // Series of If's to prevent duplicating values on the different arrays
                if (allLocationsIds.includes(response.data[i].id) === false) {
                    allLocationsIds.push(response.data[i].id);
                }
                if (allLocationsNames.includes(response.data[i].name) === false) {
                    allLocationsNames.push(response.data[i].name);
                }
                if (allLocationsBreweriesNames.includes(response.data[i].brewery.nameShortDisplay) === false) {
                    allLocationsBreweriesNames.push(response.data[i].brewery.nameShortDisplay);
                }
                if (allLocationsLocalities.includes(response.data[i].locality) === false) {
                    allLocationsLocalities.push(response.data[i].locality);
                }
                if (allLocationsRegions.includes(response.data[i].region) === false) {
                    allLocationsRegions.push(response.data[i].region);
                }
                if (allLocationsCountries.includes(response.data[i].country.isoCode) === false) {
                    allLocationsCountries.push(response.data[i].country.isoCode);
                }
            }
            console.log("Total Location IDs: " + allLocationsIds.length);
            console.log(allLocationsIds);
            console.log("Total Location Names: " + allLocationsNames.length);
            console.log(allLocationsNames);
            console.log("Total Breweries: " + allLocationsBreweriesNames.length);
            console.log(allLocationsBreweriesNames);
            console.log("Total Localities: " + allLocationsLocalities.length);
            console.log(allLocationsLocalities);
            console.log("Total Regions: " + allLocationsRegions.length);
            console.log(allLocationsRegions);
            console.log("Total Countries: " + allLocationsCountries.length);
            console.log(allLocationsCountries);
            }
        )}

// Calling random function for random location button, with this syntaxis one can add/include more functions to the listening event
$("#random").on("click", function(event) {
    event.preventDefault();
    random();
});


// Complete random function to get a random beer directly from the original random query (1st ajax call on function) in the BreweryDB API
// Once there is a random beer selected, a 2nd ajax call is used to get the specifics about that beer
// Furthermore there are a 3rd, 4th and 5th ajax calls, at the time the function was created, I (Sergio) was not aware that this was not needed,
// NEED TO CORRECT THIS IN THE NEXT DAYS.... In order to simplify code and reduce the total amount of requests
function random() {
    $.ajax({
        url: queryURLrandom, method: "GET"
    })
        .done(function (response) {
            console.log("Name: " + response.data.name);
            console.log("Category: " + response.data.style.category.name);
            console.log("Alcohol by volume(abv): " + response.data.abv + "%");
            console.log("International Bitterness Units(ibu): " + response.data.ibu);
            console.log("Style: " + response.data.style.name);
            console.log("Style description: " + response.data.style.description);
            var beerID = response.data.id;
            // This is the extra fields that makes it possible to get rid of the 3rd, 4th and 5th ajax calls
            var auxiliaryFields = "&withBreweries=Y&withSocialAccounts=Y&withIngredients=Y";
            var queryURLbeerByID = baseURL + "beer/" + beerID + apikey + auxiliaryFields;
            console.log(queryURLbeerByID);
            $.ajax({
                url: queryURLbeerByID, method: "GET"
            })
                .done(function (response) {
                    // At this point we need to improve the way of displaying results on the html
                    var selectedBeer = $("<p>").text("Selected Beer: " + response.data.name);
                    $("#resultscontainer").append(selectedBeer);
                    if (response.data.hasOwnProperty("labels")) {
                        $("#resultscontainer").append("<img src=" + response.data.labels.medium + ">");
                    }
                })
            console.log("Beer ID: " + beerID);
            var breweryByBeerID = "beer/" + beerID + "/breweries";
            var queryURLbrewery = baseURL + breweryByBeerID + apikey;
            console.log(queryURLbrewery);
            $.ajax({
                url: queryURLbrewery, method: "GET"
            })
                .done(function (response) {
                    console.log("Brewery: " + response.data[0].name);
                    var breweryID = response.data[0].id;
                    console.log("Brewery ID: " + breweryID);
                    var locationByBreweryID = "brewery/" + breweryID + "/locations";
                    var queryURLlocations = baseURL + locationByBreweryID + apikey;
                    console.log(queryURLlocations);
                    $.ajax({
                        url: queryURLlocations, method: "GET"
                    })
                        .done(function (response) {
                            console.log(response.data.length);
                            for (i = 0; i < response.data.length; i++) {
                                // This is to create a list of all potential locations from a beer/brewery
                                locations.push(response.data[i].id);
                            }
                            console.log(locations);
                            console.log(locations.length);
                            // To randomly select a location if there is more than 1
                            var randomIndex = Math.floor(Math.random() * locations.length);
                            console.log(randomIndex);
                            var winnerID = locations[randomIndex];
                            console.log(winnerID);
                            var winnerByLocationID = "location/" + winnerID;
                            var queryURLwinner = baseURL + winnerByLocationID + apikey;
                            console.log(queryURLwinner);
                            $.ajax({
                                url: queryURLwinner, method: "GET"
                            })
                                .done(function (response) {
                                    console.log("Random Location: " + response.data.locality + ", " + response.data.region + ", " + response.data.country.isoCode);
                                    console.log("Latitude: " + response.data.latitude);
                                    console.log("Longitude: " + response.data.longitude);
                                    var selectedLocation = $("<p>").text("Selected Location: " + response.data.locality + ", " + response.data.region + ", " + response.data.country.isoCode);
                                    $("#resultscontainer").append(selectedLocation);
                                })
                        })
                })
        })
}


$("#resultscontainer").hide();



$(".action").click(function () {

    $("#searchcontainer").hide();
    $("#resultscontainer").show(500);

})



