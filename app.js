var express = require('express');
var app = express();
var fs = require('fs');

console.log("test 1");

app.get('/', function (request, response) {

	console.log("test 2");
	var name = 'dicofr.txt';
	var m = fs.readFileSync(name, {encoding: "utf8"});
	var textByLine = m.split(";");

	var maj = new RegExp('[A-Z]');
	var tiret = new RegExp('-+');
	var finishByEs = new RegExp('[w{es}]');
	var finishByS = new RegExp('[w{s}]');

	const nameWihtoutmaj = textByLine.reduce((p, c) => {
		console.log(c, !maj.test(c), !tiret.test(c));
		c.length >= 5
		&& !maj.test(c)
		&& !tiret.test(c)
		&& !finishByEs.test(c)
		&& !finishByS.test(c)
		&& p.push(c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());

		return p;
	}, []);


	fs.writeFileSync("nameWihtoutmaj.txt", JSON.stringify(nameWihtoutmaj));

});

app.listen('8000');