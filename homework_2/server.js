var http = require('http');
var url = require('url');


http.createServer(function (req, res) {
    let service = require('./service.js');
    let requestUrl = url.parse(req.url, true);

    console.log(requestUrl.pathname);

    // get all dogs
    if (requestUrl.pathname === '/dog' && req.method === 'GET') {

        service.getListOfDogs(res);
        // return;
    }
    //
    // // add dog
    // if (requestUrl.pathname === '/dog' && req.method === 'PUT') {
    //
    //     service.addDog(req);
    //     return;
    // }
    //
    //
    // service.invalidRequest(req, res);

    // var myRe = new RegExp('\/dog\/[0-9]+');
    // var myArray = myRe.exec('add/dog/1fsdfsdfasss');
    // console.log(myArray)


    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello World!');
    // res.end();
}).listen(8080);
