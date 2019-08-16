var http = require('http');
var handlers = require('./handlers.js');
var colors = require('colors');

var server = http.createServer();


function start(){
	server.on('request', function (request, response) {
	    switch (request.url) { // switch rozróżniający zapytania
		case '/':
		case '/start':
		    handlers.welcome(request, response);
		    break;
		case '/upload':
		    handlers.upload(request, response);
		    break;
		case '/show':
		    handlers.show(request, response);
		    break;
		default:
		    handlers.error(request, response);
	    }
});

server.listen(8080);
console.log("Uruchomiono serwer!".green);
}

exports.start = start;
