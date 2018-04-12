'use strict';

const fs = require('fs');
// Creates .env file with defaults if it does not exist.
let env = '.env';
if (!fs.existsSync(env)) {
  console.log('.env does not exist! Creating it.');
  fs.writeFileSync('.env', fs.readFileSync('.env.tmp'));
};
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT;
const authRouter = require('./router/router.js');
const resourceRouter = require('./router/resource-router.js');
// const gpio = require('./lib/gpio.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');

const bearerAuth = require('./lib/bearer-auth-middlewear.js');
// const cors = require('cors');
// const socket = require('socket.io');
// const requestIp = require('request-ip');
const request = require('request');
const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(requestIp.mw());

require('./lib/storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


app.use((request, response) => {
  response.sendFile(__dirname + '/public/signin.html');
});

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const io = socket(server);

io.on('connection', function(socket){
  let clientIp = [];
  io.emit('ledStatus', gpio.isLedOn);
  clientIp.push(socket.request.connection.remoteAddress);
  console.log('made socket connection', socket.id, clientIp);

  socket.on('ledStatus', (isLedOn) => {
    io.sockets.emit('ledStatus', isLedOn);
  });
});


let isLedOn = false;
let usedBy = '';

// Heartbeat
// let hbServer = 'http://192.168.10.10:3002/heartbeat';
// let hbServer = 'https://shiot-remote-server.herokuapp.com/heartbeat';
setInterval(function(){
  // console.log('heartbeat');
  // this will eventually be a configuration setting in the .env file.
  request.post(process.env.HBSERVER, () => {
  });
}, 1000 * 3);

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    usedBy = 'button';
    switchLed();
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
function switchLed(req) {
  isLedOn = !isLedOn;
  let state = 0;
  let message = 'off';

  if (isLedOn) {
    state = 1;
    message = 'on';
  };
  led.writeSync(state);
  console.log('Led turned ', message, '@', new Date(), 'by:', usedBy);

  io.emit('ledStatus', isLedOn);
};