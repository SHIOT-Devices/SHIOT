'use strict';
//the idea here is, you must have the token and secret to access these routes

const express = require('express');
const Router = express.Router;
const createError = require('http-errors');

const Resource = require('../model/resources.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const resourceRouter = Router();
//post, bearAuth will check if the user is authorized
//when we make a post, it will check the user object which will 
// have a token, then it will mov on to bodyparcer and then it will run the CB
resourceRouter.post('/api/resource', bearerAuth, (req, res) =>{
 

  

  return new Resource(req.body).save()
  .then((resource) => {
  
    res.status(200).send(resource);
  })
  .catch(err => console.log(err));
//need to fill
});

//if issue take out middle resource 
resourceRouter.get('/api/resource/:userId', bearerAuth, (req, res) =>{
  console.log('30 params', req.params.userId);
  Resource.findById(req.params.userId)
  .then( resource => {

   res.json(resource);
  })
  .catch(err => console.log(err));
// need to fill
});



module.exports = resourceRouter;