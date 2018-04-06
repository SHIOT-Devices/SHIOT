'use strict';

const express = require('express');
const Router = express.Router;
const bodyParser = require('body-parser').json();
const createError = require('http-errors');

const Resource = require('../model/resources.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const resourceRouter = Router();
//post, bearAuth will check if the user is authorized
//when we make a post, it will check the user object which will 
// have a token, then it will mov on to bodyparcer and then it will run the CB
resourceRouter.post('/api/resource', bearerAuth, bodyParser, (req, res, next) =>{
  
  req.body.userId = req.user._id;
  new Resource(req.body).save()
  .then(resource => res.json(resource))
  .catch(next);
//need to fill
});

//if issue take out middle resource 
resourceRouter.get('/api/:resourceId', bearerAuth, (req, res, next) =>{
  Resource.findById(req.params.resourceId)
  .then(resource => res.json(resource))
  .catch(next);
// need to fill
});



module.exports = resourceRouter;