'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT || 3000;
const authRouter = require('../router/router.js');
const resourceRouter = require('../router/resource-router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// const dotenv = require('dotenv');

// dotenv.load();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


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