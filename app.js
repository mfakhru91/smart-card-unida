var express = require('express');
var app = express();
const path = require("path")
var PORT = process.env.PORT || 3015
var http =  require('http').createServer(app);
var io = require('socket.io').listen(http);
app.use(express.static("public"))
app.set("views", "views")
app.set('view engine', 'hbs');

app.get('/api/rfid', (req, res)=> {
  res.render('index',{ nama: req.query.nama });
});
app.get('/api/pushrfid', (req, res)=> {
  io.on('connection', (socket) => {
    socket.emit('message',req.query.rfid);
  });
  res.end();
});

var rfidRoutes = require('./app/routes/inputRfid.routes')
var permessionRoutes = require('./app/routes/permission')

app.use('/rfid', rfidRoutes)
app.use('/smcard', permessionRoutes)

exports.http = http

http.listen(PORT, ()=>{
	console.log('listening on *:'+PORT);
})