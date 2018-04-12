'use strict';
//This router is for creating a new user
//and signing in
const express = require('express');
const Router = express.Router;
const User = require('../model/user.js');
const storage = require('../lib/storage.js');
const basicAuth = require('../lib/basic-auth-middleware.js')
const bodyParser = require('body-parser').json();

const authRouter = new Router();

//signin to account, after we signin a token will generate and be used to authorize us to specific routes
authRouter.get('/api/signin', basicAuth, (req, res, next) => {
  //TODO:fillout
  //passing basicAuth to check the authheader, see basic-auth-middlewear

  User.findOne({ username: req.auth.username })
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.send(token))
    .catch(next);

  // res.sendFile('controls.html', { root: './public' });
});

//create an account 
authRouter.post('/api/signup', bodyParser, (req, res, next) => {
  //TODO:fill out
  // auth object needs to be attached to body, so it needs to run through jsonparse
  let password = req.body.password;
  delete req.body.password;
  let user = new User(req.body);
  // console.log('user',user);

  user.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.send(token))
    .catch(next);

});


module.exports = authRouter;