var express = require('express')
var app = express();
var url = require('url')
var axios = require('axios')
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'),Promise);
var bodyParser = require('body-parser');

var http = require('../../app')
var io = require('socket.io').listen(http.http);
// app use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

exports.putRfid = ( req, res, next ) => {
	let data = {nim: req.query.nim, rfid: req.query.rfid}
  if (req.query.nim && req.query.rfid) {
      var update = agent.put('http://api.unida.gontor.ac.id:1926/m/rfid/update')
      .set('Content-Type','application/x-www-form-urlencoded')
      .set('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InJpemt5bXBwbCIsImNsaWVudFNlY3JldCI6ImViY0psWUx1MGciLCJpYXQiOjE1ODMxMjA4OTN9.tsGIyqeCMTkpeG2-U0td0EiUBlTbvn1w_DSerj9kVuk')
      .buffer()
      .send(data)
      .then((res)=>{
        if (res) {
          console.log('berhasil')
        } else {
          console.log('gagal')
        }
      });

      // (async () => {
      //   try {
      //     const res = await agent.post('http://api.unida.gontor.ac.id:1926/m/rfid/update');
      //     const data = '{ "name": "Flavio", "age": 35 }'
      //     JSON.parse(data);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // })();
  }else{
    res.redirect('/api/rfid')
  }
  	res.end()
}

exports.success = (req, res, next) => {
  res.render('berhasil',{nim : req.query.nim})
}


// exports.getViewRfid = (req, res, next) =>{
// 	res.render('index')
// }

// exports.pushRfid = (req, res, next) =>{
// 	var data = io.on('connection', socket => {
//     socket.emit('message',req.query.rfid);
// 	});
// 	console.log(data);
// 	res.end();
// }