const colors = require('colors');
const express = require('express');
const upload = require("express-fileupload");
const path = require('path');
const util = require('util');
const fs = require('fs');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// middle
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(upload());

function start(){

	app.get('/', function (req, res) {
	  var imgNames = new Array();
		fs.readdir(__dirname + "/public/upload/", (err, files) => {
		  files.forEach(file => {
		    imgNames.push(file);
		  });
		});

		fs.readFile(__dirname + '/templates/start.html', 'utf8', function (err,data) {
		if (err) {
				return console.log(err);
		}
		var newhtml = new JSDOM(data);
		imgNames.forEach(nImg => {
			let img = newhtml.window.document.createElement('img')
			img.src = 'http://localhost:5000/upload/'+ nImg
			newhtml.window.document.getElementById('imGallery').appendChild(img)
		})
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.send(newhtml.window.document.documentElement.outerHTML);
});
		//res.sendFile(path.join(__dirname + '/templates/start.html'));
	});


	app.get('/show', function (request, response) {
		fs.readFile('/public/upload/test.png', "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
		});
	});

	app.route('/upload')
	.post((request, response) => {

				var images = new Array();

					if(request.files.file) {
						// console.log(util.inspect(request.files.file));
							images[0] = "/" + request.files.file.name;
							request.files.file.mv(__dirname + "/public/upload" + images[0], function (err) {
									if(err) {
										console.log(err);
									}
					});
					setTimeout(function(){response.json(images);}, 1000);
				}
});
app.listen(5000);

console.log("Uruchomiono serwer!".green);
}

exports.start = start;
