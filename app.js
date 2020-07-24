var express = require('express');
var app = express();
const path = require("path")
var PORT = process.env.PORT || 5000
var http =  require('http').createServer(app);
var io = require('socket.io').listen(http);
app.use(express.static("public"))
app.set("views", "views")
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/api/rfid', (req, res)=> {
  res.render('index');
});
app.get('/api/pushrfid', (req, res)=> {
  io.on('connection', (socket) => {
    socket.emit('message',req.query.rfid);
  });
  res.end();
});

var rfidRoutes = require('./app/routes/inputRfid.routes')
var permessionRoutes = require('./app/routes/permission.routes')

app.use('/rfid', rfidRoutes)
app.use('/p', permessionRoutes)

exports.http = http

http.listen(PORT, ()=>{
	console.log('listening on *:'+PORT);
})