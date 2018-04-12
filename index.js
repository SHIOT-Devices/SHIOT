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
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');

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
  io.emit('ledStatus', isLedOn);
  clientIp.push(socket.request.connection.remoteAddress);
  console.log('made socket connection', socket.id, clientIp);

  socket.on('ledStatus', (isLedOn) => {
    io.sockets.emit('ledStatus', isLedOn);
  });
});