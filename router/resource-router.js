'use strict';
//the idea here is, you must have the token and secret to access these routes

const express = require('express');
const Router = express.Router;
const createError = require('http-errors');
const requestIp = require('request-ip');
const User = require('../model/user.js');
const Resource = require('../model/resources.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const led1 = require('../lib/gpio.js').led1;
const storage = require('../lib/storage.js');
const resourceRouter = new Router();
//post, bearAuth will check if the user is authorized
//when we make a post, it will check the user object which will 
// have a token, then it will mov on to bodyparcer and then it will run the CB

// // Controls route
// resourceRouter.get('/api/controls', bearerAuth, (req, res) => {
//   // const location = '../public/controls.html';
//   // console.log(location);
//   // res.send(location);
//   res.sendFile('controls.html', {root:'./public'});
// });

// new test route
resourceRouter.get('/api/admin', bearerAuth, (req, res) => {
  res.sendFile('admin.html', {root:'./public'});
});

// Post request to run function and return page.

resourceRouter.post('/api/controls/led', bearerAuth, (req, res) => {
  let usedBy = '';
  usedBy = requestIp.getClientIp(req);
  led1('', usedBy); // exicutes the function to toggle LED state.
  res.sendFile('controls.html', {root:'./public'}); // returns the previous page.
});
// using httpie  http POST 192.168.10.13:3000/led

resourceRouter.post('/api/controls/led2', (req, res) => {
  let usedBy = '';
  usedBy = requestIp.getClientIp(req);
  led1('', usedBy); // exicutes the function to toggle LED state.
  res.sendFile('controls.html', {root:'./public'}); // returns the previous page.
});

//ADMIN GET ALL USERS//?
resourceRouter.get('/api/admin', bearerAuth, (request, response) => {
  User.find()
    .then(list => {
      console.log('resource-47 LIST: ', list);
      response.send(list);
    });
});
////////
//ADMIN GET ONE USER//?
resourceRouter.get('/api/admin', bearerAuth, (request, response) => {
  let r = storage.getAll();
console.log(r);
  // User.findOne({ username: request.auth.username })
  //   .then(user => user.comparePasswordHash(request.auth.password))
  //   // .then(user => user.generateToken())
  //   // .then(token => response.send(token));
  //   .then(searchedUser => {
  //     response.send(searchedUser);
  //   });
});
////////
// ADMIN ADD USER//?
resourceRouter.post('/api/admin', basicAuth, (request, response) => {
  // let password = request.body.password;
  // delete request.body.password;
  // let user = new User(request.body);
  user.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => response.send(token));
});
////////

module.exports = resourceRouter;