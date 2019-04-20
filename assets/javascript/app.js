// when window loads
window.onload = function () {

    // hide the results container
    $("#randomcontainer").hide();

    // app version
    console.log("app v7");

};

// beer icon thingy on the top left corner that works as a home button
$("#beericon").click(function () {

    // hide and show containers accordingly
    $("#titlediv").show();
    $("#searchcontainer").show();
    $("#randomcontainer").hide();

});

// current location option clicked
$("#current").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

    // ? begins procedure

});

// another location option clicked
$("#another").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

});

// random beer option event
$("#random").on("click", function (event) {

    // preventing default behavior
    event.preventDefault();

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
            $("#r_beerphoto").attr("src", "../images/nobeerimg.png");
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
        allLocations = [];
    })

    // hide and show containers accordingly
    $("#titlediv").hide();
    $("#searchcontainer").hide();
    $("#randomcontainer").show(500);

});