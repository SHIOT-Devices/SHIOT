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
const http = require('http').Server(app);
const socket = require('socket.io')(http);

const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT || 3000;
const authRouter = require('../router/router.js');
const resourceRouter = require('../router/resource-router.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const gpio = require('../lib/gpio.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const request = require('request'); // Used by heartbeat server
const cors = require('cors');


mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestIp.mw());

require('./storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


// START: JB addition to handle redirecting to controls page
app.use(express.static('./public'));

app.use((req, res) => {
  res.sendFile('signin.html', { root: './public' });
});

// Heartbeat
// let hbServer = 'http://192.168.10.10:3002/heartbeat';
// let hbServer = 'https://shiot-remote-server.herokuapp.com/heartbeat';
setInterval(function () {
  // console.log('heartbeat');
  request.post(process.env.HBSERVER, () => {
  });
}, 1000 * 3);

// Server Controls
const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) return reject(new Error('Server Error. Server already running.'));
    server.http = http.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(process.env.MONGODB_URI);
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) return reject(new Error('Server Error. Server already stopped.'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};