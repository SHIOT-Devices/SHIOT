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
  //passing basicAuth to check the authheader, see basic-auth-middlewear
  User.findOne({ username: req.auth.username })
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.send(token))
    // .then(res.sendFile('controls.html', { root: './public' }));
    .catch(next);
  // res.sendFile('controls.html', { root: './public' });
});

// // Controls route
// authRouter.get('/api/controls', basicAuth, (req, res) => {
//   // const location = '../public/controls.html';
//   // console.log(location);
//   // res.send(location);
//   res.sendFile('controls.html', {root:'./public'});
// });

//create an account 
authRouter.post('/api/signup', bodyParser, (req, res, next) => {
  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => {
      let token = user.generateToken();
      return token;
    })
    .then(token => {
      let results = { token, user };
      return results;
    })
    .then(results => {
      res.send(results);
    })
    .catch(next);
});

authRouter.get('/controls', (req, res) => {
  res.sendFile('/controls.html', {root:'./public'});
});

authRouter.get('/admin', (req, res) => {
  res.sendFile('/admin.html', {root:'./public'});
});

module.exports = authRouter;