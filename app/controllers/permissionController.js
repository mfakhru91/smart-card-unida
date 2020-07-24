var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var db = require('../db_config')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var date = new Date();
exports.getData = (req, res, next) => {
	// db.connect(function(err) {
		
	// 	var sql = "INSERT INTO esp_izin_keluar (nim, waktu, izin) VALUES (3820176110346,'2020-07-23 15:55:01','2')"

	// 	db.query(sql,function (err, result) {
	// 		if (err) throw err;
	// 		db.connect(function(err) {
	// 			var sql = "INSERT INTO esp_izin_keluar (nim, waktu, izin) VALUES (3820176110346,'2020-07-23 15:55:01','2')"
	// 		})

	// 	})

	// })
}