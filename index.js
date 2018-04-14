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

mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(requestIp.mw());

require('./lib/storage.js');



app.use('/', authRouter);
app.use('/', resourceRouter);

// START: JB addition to handle redirecting to controls page
app.use('/controls', express.static('./public'));

app.get('/controls', (req, res) => {
  // rename to controls.html when ready
  res.sendFile('/controls-test.html', {root:'./public'});
});
// END: Note - must come before catch all route

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

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports.server = server; 