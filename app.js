var express = require('express');
var app = express();
var fs = require('fs');

app.get('/fr', function (request, response) {

	console.log("launch dico fr");
	var name = 'dicofr.txt';
	var m = fs.readFileSync("./dico/" + name, {encoding: "utf8"});
	var textByLine = m.split(";");

	var maj = new RegExp('[A-Z]');
	var tiret = new RegExp('-+');
	var finishByEs = new RegExp('[w{es}]');
	var finishByS = new RegExp('[w{s}]');

	const nameWihtoutmaj = textByLine.reduce((p, c) => {
		c.length >= 5
		&& !maj.test(c)
		&& !tiret.test(c)
		&& !finishByEs.test(c)
		&& !finishByS.test(c)
		&& p.push(c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());

		return p;
	}, []);


	fs.writeFileSync("./src/dicoFr.json", JSON.stringify(nameWihtoutmaj));
	console.log("finish dico fr");
});

app.get('/en', function (request, response) {

	console.log("launch dico en");
	var name = 'dicoen.txt';
	var m = fs.readFileSync("./dico/" + name, {encoding: "utf8"});
	var textByLine = m.split("\r\n");

	const nameWihtoutmaj = textByLine.reduce((p, c) => {
		c.length >= 5
		&& p.push(c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());

		return p;
	}, []);


	fs.writeFileSync("./src/dicoEn.json", JSON.stringify(nameWihtoutmaj));
	console.log("finish dico en");
});

app.listen('8000');