let http = require('http');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer().listen(8080);

server.on('request', (req, res) => {

    let body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        let requestBody = querystring.parse(body);

        let requestUrl = url.parse(req.url, true).pathname;
        let requestMethod = req.method;
        let service = require('./service.js');

        console.log(requestUrl);
        console.log(requestMethod);

        let urlRegex = new RegExp('\/dog\/[0-9]+');
        let match = urlRegex.exec(requestUrl);

        if (match !== null) {

            let matchingUrl = match[0];

            let id = matchingUrl.substring(matchingUrl.lastIndexOf('/') + 1, matchingUrl.length);

            if (id && requestMethod === "GET") {
                service.getDog(id, res);
            }

            if (matchingUrl && requestMethod === "PUT") {
                service.updateDog(id, requestBody, res);
            }

            if (matchingUrl && requestMethod === "DELETE") {
                service.removeDog(id, res);
            }
        } else if (requestUrl === "/dogs" && requestMethod === "GET") {
            service.getListOfDogs(res);
        } else if (requestUrl === "/dog" && requestMethod === "POST") {
            service.addDog(requestBody, res);
        } else {
            service.invalidRequest(res);
        }

    });

});