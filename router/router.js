'use strict';

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
const authRouter = express.Router();
const User = require('../model/user.js');
const storage = require('../lib/storage.js');
const basicAuth = require('../lib/basic-auth-middleware.js')
const bodyParser = require('body-parser').json();



 
authRouter.post('/api/signup', bodyParser, (req, res, next) => {
  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);
  console.log('routes user',req.body)
  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send({token}))
  .catch(next);

});


authRouter.get('/api/signin', basicAuth, (req, res, next) =>{
  User.findOne({ username: req.auth.username})
.then( user => user.generatePasswordHash(req.auth.password))
.then( user => user.generateToken())
.then( token => res.send(token))
.catch(next);

});

module.exports = authRouter;