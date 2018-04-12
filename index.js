'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT;
const authRouter = require('./router/router.js');
const resourceRouter = require('./router/resource-router.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./lib/storage.js');

app.use('/', authRouter);
app.use('/', resourceRouter);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});