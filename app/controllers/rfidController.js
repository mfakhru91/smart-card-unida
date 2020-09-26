// var express = require('express')
// var app = express();
// var url = require('url')
// var axios = require('axios')
// var Promise = this.Promise || require('promise');
// var agent = require('superagent-promise')(require('superagent'),Promise);
// var bodyParser = require('body-parser');
// const tok = require('../../config/token.json')
// const svcConfig = require('../../config/svc.json')

// var http = require('../../app')
// var io = require('socket.io').listen(http.http);
// // app use
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// exports.putRfid = ( req, res, next ) => {
// 	let data = {nim: req.query.nim, rfid: req.query.rfid}
//   if (req.query.nim && req.query.rfid) {
//       var update = agent.put(svcConfig.rfid+'/m/rfid/update')
//       .set('Content-Type','application/x-www-form-urlencoded')
//       .set('x-access-token',tok.token)
//       .buffer()
//       .send(data)
//       .then((res)=>{
//         if (res) {
//           console.log('berhasil')
//         } else {
//           console.log('gagal')
//         }
//       });

//       // (async () => {
//       //   try {
//       //     const res = await agent.post('http://api.unida.gontor.ac.id:1926/m/rfid/update');
//       //     const data = '{ "name": "Flavio", "age": 35 }'
//       //     JSON.parse(data);
//       //   } catch (err) {
//       //     console.error(err);
//       //   }
//       // })();
//   }else{
//     res.redirect('/api/rfid')
//   }
//   	res.end()
// }

// exports.success = (req, res, next) => {
//   res.render('berhasil',{nim : req.query.nim})
// }


// // exports.getViewRfid = (req, res, next) =>{
// // 	res.render('index')
// // }

// // exports.pushRfid = (req, res, next) =>{
// // 	var data = io.on('connection', socket => {
// //     socket.emit('message',req.query.rfid);
// // 	});
// // 	console.log(data);
// // 	res.end();
// // }