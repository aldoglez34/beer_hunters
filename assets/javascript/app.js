// * when window loads
window.onload = function () {

    // hide the results container
    $("#randomcontainer").hide();

};

// * when an icon is clicked
$(".action").click(function () {

    // hide and show containers accordingly
    $("#searchcontainer").hide();
    $("#resultscontainer").show(500);

});

// * beer icon thingy on the top left corner that works as a home button
$("#beericon").click(function () {

    // hide and show containers accordingly
    $("#searchcontainer").show(500);
    $("#rc-random").hide();

});

// * current location option clicked
$("#current").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // ? begins procedure

});

// * another location option clicked
$("#another").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

});

// * randopm location option clicked
$("#random").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // all locations id will be stored in this array
    var allLocationIDs = [];

    // json call to the file taht contains all data
    $.getJSON("./assets/json/alldata.json", function (response) {

        // iterate all the json and store the ids
        for (i = 0; i < response.data.length; i++) {

            allLocationIDs.push(response.data[i].id);
        }

        // generate random number from 0 to the all locations lenght
        var r = Math.floor(Math.random() * allLocationIDs.length);
        
        // get the id on a var
        var randomID = allLocationIDs[r];
        console.log("id randomnly selected: " + randomID);

        var beer = response.data[r];
        console.log(beer);

        // $("#results3").append("<p>Selected beer: " + response.data[randomIndex].name + "</p>");

        // if (response.data[randomIndex].hasOwnProperty("labels")) {
        //     $("#results3").append("<img src=" + response.data[randomIndex].labels.medium + ">");
        // }
        // else {
        //     $("#results3").append("<p>No label to display</p>");
        // }
        // if (response.data[randomIndex].hasOwnProperty("description")) {
        //     $("#results3").append("<p>Beer Description: " + response.data[randomIndex].description + "</p>");
        // }
        // else {
        //     $("#results3").append("<p>Beer Description: Not available");
        // }
        // if (response.data[randomIndex].hasOwnProperty("style")) {
        //     $("#results3").append("<p>Beer Category: " + response.data[randomIndex].style.category.name + "</p>");
        //     $("#results3").append("<p>Beer Style: " + response.data[randomIndex].style.name + "</p>");
        //     $("#results3").append("<p>Style description: " + response.data[randomIndex].style.description + "</p>");
        // }
        // else {
        //     $("#results3").append("<p>Beer Category: Not available</p>");
        //     $("#results3").append("<p>Beer Style: Not available</p>");
        //     $("#results3").append("<p>Style description: Not available</p>");
        // }
        // // if (response.data[randomIndex].hasOwnProperty("description")) {
        // //     $("#results3").append("<p>Beer Description: " + response.data[randomIndex].description + "</p>");
        // // }
        // // else {
        // //     $("#results3").append("<p>Beer Description: Not available");
        // // }
        // if (response.data[randomIndex].hasOwnProperty("abv")) {
        //     $("#results3").append("<p>Alcohol by volume: " + response.data[randomIndex].abv + "%</p>");
        // }
        // else {
        //     $("#results3").append("<p>Alcohol by volume: Not available");
        // }
        // if (response.data[randomIndex].hasOwnProperty("available")) {
        //     $("#results3").append("<p>Availability: " + response.data[randomIndex].available.name + "." + response.data[randomIndex].available.description + "</p>");
        // }
        // else {
        //     $("#results3").append("<p>Availability: Not defined");
        // }
        // console.log("Beer name: " + response.data[randomIndex].name);
        // console.log("Category: " + response.data[randomIndex].style.category.name);
        // console.log("Style: " + response.data[randomIndex].style.name);
        // // var selectedBeer = $("<p>").text("Randomly selected beer: " + response.data[randomIndex].name);
        // // $("#results3").append(selectedBeer);
        // // if (response.data[randomIndex].hasOwnProperty("labels")) {
        // //     $("#results3").append("<img src=" + response.data[randomIndex].labels.medium + ">");
        // // }
        // // else {
        // //     $("#results3").append("<p>No label to display</p>");
        // // }
        // $.getJSON("master.json", function (master) {
        //     console.log(master.data.length);
        //     for (i = 1; i < master.data.length; i++) {
        //         if (randomID === master.data[i].C) {
        //             var locationID = master.data[i].G;
        //             console.log(locationID);
        //         }
        //     }
        //     $.getJSON("Locations.json", function (response) {
        //         console.log(response.data.length);
        //         for (i = 0; i < response.data.length; i++) {
        //             if (locationID === response.data[i].id) {
        //                 console.log(response.data[i].locality);
        //                 console.log(response.data[i].region);
        //                 $("#results3").append("<p>This beer you can find in: " + response.data[i].locality + ", " + response.data[i].region + "</p>");
        //             }
        //         }
        //     })
        // })

        // randomIndex = 0;
        // allLocations = [];

    })

    // hide and show containers accordingly
    $("#searchcontainer").hide();
    $("#randomcontainer").show(500);

});
