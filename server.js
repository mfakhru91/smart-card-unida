var express = require('express');
var app = express();
var http =  require('http').createServer(app);	
var io = require('socket.io')(http);
var path = require('path');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'),Promise);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/api/smartcart',(req, res) => {
  let data = {nim: req.query.nim, rfid: req.query.rfid}
  agent.put('http://api.unida.gontor.ac.id:1926/m/rfid/update')
  .set('Content-Type','application/x-www-form-urlencoded')
  .set('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6InJpemt5bXBwbCIsImNsaWVudFNlY3JldCI6ImViY0psWUx1MGciLCJpYXQiOjE1ODMxMjA4OTN9.tsGIyqeCMTkpeG2-U0td0EiUBlTbvn1w_DSerj9kVuk')
  .buffer()
  .send(data)
  .catch(err => {
    console.log(err);
  })  
  .then(res => {
    // res.redirect('/api/getdata/?pos='+req.query.pos+'&rfid='+req.query.rfid);
    console.log('berhasil');
  });
  res.writeHead(302, {
    'Location': '/api/rfid'
    //add other headers here...
  })
  res.end();
});1
app.get('/api/rfid', (req, res)=> {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/api/pushrfid', (req, res)=> {
  io.on('connection', (socket) => {
    socket.emit('message',req.query.rfid);
  });
  // res.json({
  //   rfid : 'asdsad',
  // }); 
  res.end();
});
http.listen(3000, ()=>{
	console.log('listening on *:3000');
})