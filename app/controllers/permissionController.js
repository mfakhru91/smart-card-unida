var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db_config')
var Promise = require('promise');
var moment = require('moment');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function set_izin(rfid,status,cb) {
	// var rfid =  req.query.rfid
	var datetime = moment().format('YYYY-MM-DD HH:mm:ss')
	console.log(rfid+' '+datetime);
	var sql = "SELECT * FROM simak_mastermahasiswa WHERE rfid = ?"
	var rfidData = new Promise(function(resolve, reject ) {
		db.query(sql,rfid,function(err, results){
			if (err){
				console.log(err);
				reject(err)
			}
			data = results[0];
			if(data == null){
				// reject(err)
				// // res.json({
				// // 	"status": 404,
				// // 	"message":"data tidak dimeukan",
				// // })
				var hasil = {
					"status": 404,
					"message":"nim tidak ditemukan",
				}
				cb (null,hasil)
			}else{
				var nim =  data.nim_mhs
				resolve(nim);
			}
		})
	})

	rfidData.then((nim,reject) => {
		var sql = "INSERT INTO erp_izin_harian (nim, waktu, status_izin) VALUES (?,?,?)"
		db.query(sql,[nim,datetime,status],function (err, results) {
			if (err){
				console.log(err)
				reject(err)
			}
			var hasil = {
				"status": 200,
				"message":"anda berhasil "+status,
			}
			cb (null,hasil)
		})
	})
	rfidData.catch(err => {
		console.log(err);
		cb (err,null)
		// res.json(err)
		// res.end()
	})
}

exports.keluar = (req, res, next) => {
	var rfid =  req.query.rfid
	set_izin(rfid,2,function(err,hasil){
		if(err){
			console.log(err);
			res.json(err)
			res.end()
		}
		res.json(hasil)
		console.log(hasil)
		res.end()
	})

}

exports.masuk = (req, res, next) => {
	var rfid =  req.query.rfid
	set_izin(rfid,1,function(err,hasil){
		if(err){
			console.log(err);
			res.json(err)
			res.end()
		}
		res.json(hasil)
		console.log(hasil)
		res.end()
	})
}
exports.izin = ( req, res,  next )=> {
	res.render('perizinan')
}