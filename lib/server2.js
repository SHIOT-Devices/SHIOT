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
const PORT = process.env.PORT || 3000;
const authRouter = require('../router/router.js');
const resourceRouter = require('../router/resource-router.js');
const gpio = require('../lib/gpio.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const request = require('request'); // Used by heartbeat server
const socket = require('socket.io');
const cors = require('cors');

// const bearerAuth = require('./lib/bearer-auth-middlewear.js');
// const cors = require('cors');
// const socket = require('socket.io');
//

// const Gpio = require('onoff').Gpio;
// const led = new Gpio(18, 'out');
// const button = new Gpio(4, 'in', 'both');

// mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(requestIp.mw());

require('./lib/storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


app.use((req, res) => {
  res.sendFile('signin.html', {root:'./public'});
});

// Heartbeat
// let hbServer = 'http://192.168.10.10:3002/heartbeat';
// let hbServer = 'https://shiot-remote-server.herokuapp.com/heartbeat';
setInterval(function(){
  // console.log('heartbeat');
  request.post(process.env.HBSERVER, () => {
  });
}, 1000 * 3);

app.use((request, response) => {
  // have the server send back something
  response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  response.write('Testing Basic Server Response');//test response
  response.end();//test response
});

// Server Controls
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Server already running.'));
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(process.env.MONGODB_URI);
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};
// const server = app.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// });

// module.exports.server = server; 