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
const resourceRouter = new Router();
//post, bearAuth will check if the user is authorized
//when we make a post, it will check the user object which will 
// have a token, then it will mov on to bodyparcer and then it will run the CB
resourceRouter.post('/api/resource', bearerAuth, (req, res) => {
  // console.log('req-user_Id-resource-router', req.user);
  req.body.userId = req.user._id;
  // console.log('req-user_Id-resource-router', req.body);
  return new Resource(req.body).save()
    .then((resource) => {
      res.json(resource);
      // console.log('resource', resource);
    })
    .catch(err => console.log(err));
  //need to fill
});

// Controls route
// resourceRouter.get('/api/controls', bearerAuth, (req, res) => {
//   // const location = '../public/controls.html';
//   // console.log(location);
//   // res.send(location);
//   // res.sendFile('controls.html', {root:'./public'});
// });

// new test route
resourceRouter.get('/api/admin', bearerAuth, (req, res) => {
  res.sendFile('admin.html', {root:'./public'});
});

// resourceRouter.get('/api/ping', (req, res) => {
//   res.send('pong!');
// });

// Post request to run function and return page.

resourceRouter.post('/api/controls/led', (req, res) => {
  let usedBy = '';
  usedBy = requestIp.getClientIp(req);
  led1('', usedBy); // exicutes the function to toggle LED state.
  // led1();

  // console.log(request.connection.remoteAddress); 
  // console.log(requestIp.getClientIp(req));
  
  res.sendFile('/controls.html', {root:'./public'});
  // res.sendFile('controls.html', {root:'./public'}); // returns the previous page.
});
// using httpie  http POST 192.168.10.13:3000/led

module.exports = resourceRouter;