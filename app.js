'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();

const authRouter = require('./router/router.js');
const resourceRouter = require('./router/resource-router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// const dotenv = require('dotenv');
mongoose.connect(process.env.MONGODB_URI);
// dotenv.load();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./lib/storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);


app.use((request, response) => {
  // have the server send back something
  response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  response.write('Testing Basic Server Response');//test response
  response.end();//test response
});

module.exports = app; 