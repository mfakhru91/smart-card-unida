var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db_config')
var Promise = require('promise');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

exports.keluar = (req, res, next) => {
	var rfid =  req.query.rfid
	var date = req.query.date
	console.log(rfid+date);
	var sql = "SELECT * FROM simak_mastermahasiswa WHERE rfid = ?"
	var rfidData = new Promise(function(resolve, reject ) {
		db.query(sql,rfid,function(err, results){
			if (err){
				console.log(err);
				reject(err)
			}
			data = results[0];
			if(data == null){
				reject(err)
				res.json({
					"status": 404,
					"message":"data tidak dimeukan",
				})
			}else{
				var nim =  data.nim_mhs
				resolve(nim);
			}
		})
	})

	rfidData.then((nim,reject) => {
		var sql = "INSERT INTO erp_izin_harian (nim, waktu, status_izin) VALUES (?,?,'2')"
		db.query(sql,[nim,date],function (err, results) {
			if (err){
				console.log(err)
				reject(err)
			}
			res.json({
				"status": 200,
				"message":"anda berhasil keluar",
			})
		})
	})
	rfidData.catch(err => {
		console.log(err);
		res.json(err)
		res.end()
	})
	
}

exports.masuk = (req, res, next) => {
	var rfid =  req.query.rfid
	var date = req.query.date
	var sql = "SELECT * FROM simak_mastermahasiswa WHERE rfid = ?"
	var rfidData = new Promise(function(resolve, reject ) {
		db.query(sql,rfid,function(err, results){
			if (err){
				console.log(err);
				reject(err)
			}
			data = results[0];
			if(data == null){
				reject(err)
				res.json({
					"status": 404,
					"message":"data tidak dimeukan",
				})
			}else{
				var nim =  data.nim_mhs
				resolve(nim);
			}
		})
	})
	rfidData.then((nim,reject) => {
		var sql = "UPDATE erp_izin_harian SET status_izin = 1 WHERE nim=?"
		db.query(sql,nim,function (err, results) {
			if (err){
				console.log(err)
				reject(err)
			}	
			data = results[0]
			res.json({
				"status": 200,
				"message":"anda berhasil masuk",
			})
		})
	})
	rfidData.catch(err =>{
		console.log(err)
		res.json(err)
		res.end()
	})
}
exports.getData = ( req, res,  next )=> {
	var getDataKeluar = new Promise((resolve,reject)=>{
		var sql=" SELECT a.created_at,b.nim_mhs as 'nim',b.nama_mahasiswa,b.semester,c.nama_prodi FROM  erp_izin_harian a JOIN simak_mastermahasiswa b ON a.nim = b.nim_mhs JOIN simak_masterprogramstudi c ON b.kode_prodi = c.kode_prodi WHERE a.status_izin = 2 ORDER BY a.created_at DESC LIMIT 1"
		db.query(sql,function(err,result) {
			if (err){
				console.log(err)
				reject(err)
			}
			resolve(result)
		})
	})
	getDataKeluar.then(data =>{
		res.json(data)
	})
	getDataKeluar.catch(err =>{
		console.log(err)
		res.json(err)
		res.end()
	})
}
exports.izin = ( req, res,  next )=> {
	res.render('perizinan')
}