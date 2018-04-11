'use strict';
const express = require('express');
const Router = express.Router;
const createError = require('http-errors');

const Resource = require('../model/resources.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const resourceRouter = Router();

resourceRouter.post('/api/resource', bearerAuth, (req, res) =>{
 
  console.log('req-user_Id-resource-router', req.user);
   
 
  req.body.userId = req.user._id;
  console.log('req-user_Id-resource-router', req.body);
  return new Resource(req.body).save()
  .then((resource) => {
    res.json(resource);
    console.log('resource',resource);
  })
  .catch(err => console.log(err));
//need to fill
});

//if issue take out middle resource 
resourceRouter.get('/api/resource', bearerAuth, (req, res) =>{
  Resource.findById(req.params.resourceId)
  .then(resource => res.json(resource))
  .catch(err => console.log(err));
// need to fill
});



module.exports = resourceRouter;