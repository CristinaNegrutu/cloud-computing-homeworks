function callFlickrAppi(data, callback) {
    var latitude = data.latitude;
    var longitude = data.longitude;

    // display long and lat to DOM
    document.getElementById("lat").innerHTML = "Latitude: " + latitude;
    document.getElementById("long").innerHTML = "Longitude: " + longitude;

    var xmlhttp;

    // generate random number to get a random picture
    var randomNumber = Math.floor((Math.random() * 100) + 1);

    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f783ac00f1c15a249883048fcb0591c&lat=" + latitude
        + "&lon=" + longitude + "&format=json"
        + "&per_page=" + randomNumber;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            var responsePhotoJson = xmlhttp.responseText.substring(xmlhttp.responseText.indexOf("(") + 1).substring(0, xmlhttp.responseText.length - 1);
            responsePhotoJson = responsePhotoJson.substring(0, responsePhotoJson.length - 1);

            var obj = JSON.parse(responsePhotoJson);
            var photo = obj["photos"]["photo"][randomNumber - 1];


            var photoUrl = "https://farm" + photo["farm"] + ".staticflickr.com/" + photo["server"] + "/" + photo["id"] + "_" + photo["secret"] + ".jpg";
            data.photoUrl = photoUrl;
            var elem = document.createElement("img");

            elem.setAttribute("src", photoUrl);
            elem.setAttribute("height", "500");

            document.getElementById("photo").appendChild(elem);
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function callImaggaAppi(data) {

    var xmlhttp2;

    var imaggaUrl = "https://api.imagga.com/v2/tags?image_url=" + data.photoUrl;

    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", imaggaUrl, true);
    xmlhttp2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xmlhttp2.setRequestHeader("Authorization", "Basic " + btoa("acc_bea3bce3f86774e:17254d3b38f86621f6fba4df0c491621"));
    xmlhttp2.setRequestHeader('Accept', 'application/json');

    xmlhttp2.send();
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {

            var imageRecognitionResults = JSON.parse(xmlhttp2.responseText)["result"]["tags"];

            var text = '';
            for (var i = 0; i < 10; i++) {
                text += imageRecognitionResults[i]["tag"]["en"] + "<br>";
            }
            // console.log(text);
            document.getElementById("description").innerHTML = text;

        }
    }
}

function callIpwhoisAppi(data, callback) {
    var xmlhttp0;
    xmlhttp0 = new XMLHttpRequest();

    xmlhttp0.open("GET", "http://free.ipwhois.io/json/", true);
    xmlhttp0.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xmlhttp0.setRequestHeader('Accept', 'application/json');
    xmlhttp0.send();

    xmlhttp0.onreadystatechange = function () {

        if (xmlhttp0.readyState === 4 && xmlhttp0.status === 200) {
            data.latitude = JSON.parse(xmlhttp0.responseText).latitude;
            data.longitude = JSON.parse(xmlhttp0.responseText).longitude;
            callback(data);
        }
    };
}

var data = {};

callIpwhoisAppi(data, function (data) {

    callFlickrAppi(data, function (data) {

        callImaggaAppi(data);

    });
});


function log(text) {

    function errorHandler(e) {

        console.log('Error: ' + e);
    }

    function onInitFs(fs) {

        fs.getFile('log.txt', {create: false}, function (fileEntry) {

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.seek(fileWriter.length); // Start write position at EOF.

                // Create a new Blob and write it to log.txt.
                var blob = new Blob(['Hello World'], {type: 'text/plain'});

                fileWriter.write(blob);

            }, errorHandler);

        }, errorHandler);

    }

    window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFs, errorHandler);
}

log("blaaaaa")