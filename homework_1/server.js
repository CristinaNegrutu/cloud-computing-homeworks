var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(request, response) {

	console.log(response);
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';

	var extension = path.extname(filePath);
	var contentType = 'text/html';
	switch (extension) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}

	fs.readFile(filePath, function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		} else {
			response.writeHead(200, {
				'Content-Type': contentType
			});
			response.end(content, 'utf-8');
		}
	});

}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');