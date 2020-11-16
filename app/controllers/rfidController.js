var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db_config')
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var moment = require('moment');
const tok = require('../../config/token.json');
const { reject } = require('promise');
const { resolve } = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

exports.index = (req, res)=>{
    res.render('input-rfid')
}
exports.iputRfid = ( req, res)=> {
    const rfid = req.query.rfid
    var sql = "INSERT INTO rfid (rifd) VALUES (?)"
    var insert =  new Promise(function(resolve, reject){
        db.query(sql, rfid, function(err, results){
            if(err){
                if(err.errno == 1062 || err.code == 'ER_DUP_ENTRY'){
                    resolve(1062)
                }else{
                    reject(err)
                }
            }else{
                resolve(200)
            }
        })
    })
    insert.then((code) =>{
        if(err){
            resolve(code)
        }else if(err){
            reject(err)
        }else{
            res.json({
                "status": code,
                "message":"rfid berhasil dimasukan",
            })
        }
        res.end()
    })
    insert.then((code)=>{
        res.json({
            "status": code,
            "message":"rfid sudah terdaftar",
        })
        res.end()
    })
    insert.catch(err => {
        res.json(err)
        res.end()
    })
}

exports.apiGet = (req, res)=> {
    var sql = "SELECT rifd FROM rfid ORDER BY created_at DESC LIMIT 1"
    var apiData = new Promise(function(resolve, reject){
      db.query(sql,function(err, results){
        if (err){
            resolve(404)
        }else{
            resolve(results)
        }
      })
    })
    apiData.then((data)=>{
        res.json({
            "code":200,
            "data":data
        })
        res.end()
    })
    apiData.catch(err => {
        res.json()
        res.end()
    })
}

exports.store = (req, res) => {
    var inputRfid = new Promise((resolve, reject)=>{
        let data = {nim: req.query.nim, rfid: req.query.rfid}
        resolve(data)
    })
    inputRfid.then((data)=>{
        var update = agent.put(svcConfig.rfid+'/m/rfid/update')
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('x-access-token',secretConfig.token)
            .buffer()
            .send(data)
            .then((resolve,err)=>{
                if(err){
                    reject(err)
                }
                res.json({
                    "code":200,
                    "message":"data behasil dimasukan",
                    "data":data
                })
            });
    })
    inputRfid.catch(err =>{
        res.json(err)
    })
}

exports.apiStrore = (req, res) => {
    var inputRfid = new Promise((resolve, reject)=>{
        let rfid = req.query.rfid
        resolve(rfid)
    })
    inputRfid.then((data)=>{
        var rfid = data
        var update = agent.get(svcConfig.rfid+'/m/rfid/get?rfid='+rfid)
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('x-access-token',secretConfig.token)
            .buffer()
            .then((resolve,err)=>{
                if(err){
                    reject(err)
                }
                res.json({
                    "status":200,
                    "message":"data behasil dimasukan",
                    "data":resolve.body
                })
            });
    })
    inputRfid.catch(err =>{
        res.json(err)
    })
}
