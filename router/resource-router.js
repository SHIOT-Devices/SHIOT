'use strict';
//the idea here is, you must have the token and secret to access these routes

const express = require('express');
const Router = express.Router;
const createError = require('http-errors');
const User = require('../model/user.js');
const Resource = require('../model/resources.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
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

// //if issue take out middle resource 
// resourceRouter.get('/api/resource', bearerAuth, (req, res) => {
//   Resource.findById(req.params.resourceId)
//     .then(resource => res.json(resource))
//     .catch(err => console.log(err));
//   // need to fill
//   // res.sendFile('controls.html', {root:'./public'});
// });

// new test route
resourceRouter.get('/api/resource', bearerAuth, (req, res) => {
  // Resource.find()
  //   .then(resources => res.json(resources))
  //   .catch(err => console.log(err));
  // need to fill
  res.sendFile('controls.html', {root:'./public'});
});

resourceRouter.get('/api/ping', (req, res) => {
  res.send('pong!');
});

// //Temp test router 
// resourceRouter.get('/api/resource', basicAuth, (req, res) => {
//   User.findOne({ username: req.auth.username })
//     .then(user => user.comparePasswordHash(req.auth.password))
//     .catch();
//   // Resource.findById(req.params.resourceId)
//   //   .then(resource => res.json(resource))
//   //   .catch(err => console.log(err));
//   // // need to fill
//   console.log(__dirname + '../public/controls.html');
//   // res.sendFile(__dirname + '../public/controls.html');
//   // only works as long as there are no other dependencies
//   res.sendFile('controls.html', {root:'./public'});
// });



module.exports = resourceRouter;