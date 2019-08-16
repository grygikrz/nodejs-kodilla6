var fs = require('fs');
var start = fs.readFileSync('templates/start.html');
var page404 = fs.readFileSync('templates/404.html');
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.write(start);
    response.end();
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    response.write(page404);
    response.end();
}

exports.show = function(request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
