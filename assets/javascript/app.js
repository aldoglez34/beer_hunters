// * when window loads
window.onload = function () {

    // hide the results container
    $("#randomcontainer").hide();

};

// * beer icon thingy on the top left corner that works as a home button
$("#beericon").click(function () {

    // hide and show containers accordingly
    $("#titlediv").show();
    $("#searchcontainer").show();
    $("#randomcontainer").hide();

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

// * random beer option clicked
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

        // store the object from the json in a var
        var beer = response.data[r];
        console.log(beer);

        // update the html - name
        $("#r_beername").text(beer.name);

        // update the html - photo (label)
        if (beer.hasOwnProperty("labels")) {
            $("#r_beerphoto").attr("src" + beer.labels.medium + ">");
        }
        else {
            $("#r_beerphoto").attr("src", "https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg");
        }

        // update the html - description
        if (beer.hasOwnProperty("description")) {
            $("#r_beerdescription").text(beer.description);
        }
        else {
            $("#r_beerdescription").text("");
        }

        // update the html - style
        if (beer.hasOwnProperty("style")) {
            $("#r_stylecategoryname").text(beer.style.category.name);
            $("#r_stylename").text(beer.style.name);
            $("#r_styledescription").text(beer.style.description);
        }
        else {
            $("#r_stylecategoryname").text("");
            $("#r_stylename").text("");
            $("#r_styledescription").text("");
        }

        // update the html - abv
        if (beer.hasOwnProperty("abv")) {
            $("#r_abv").text(beer.abv);
        }
        else {
            $("#r_abv").text("");
        }

        // update the html - ibu
        if (beer.hasOwnProperty("ibu")) {
            $("#r_ibu").text(beer.ibu);
        }
        else {
            $("#r_ibu").text("");
        }

        // update the html - available
        if (beer.hasOwnProperty("available")) {
            $("#r_availability").text(beer.available.name + " / " + beer.available.description);
        }
        else {
            $("#r_availability").text("");
        }

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
        //         if (beer.id === master.data[i].C) {
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
        allLocations = [];

    })

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#randomcontainer").show(500);

});
