'use strict'; 

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/user.js');


module.exports = function(req, res, next){
  console.log('9, req.headers', req.headers);
  var authHeader = req.get('Authorization');
  console.log('10, header', authHeader);
  if(!authHeader){
    return next(createError(400, 'authorization header required'));

  };

  var token = authHeader.split('Bearer ')[1];
  if(!token){
    return next(createError(401, 'token required'));
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return next(err);
    console.log('token inside bearer auth', token);
    User.findOne({ findToken: decoded.token})
    .then(user =>{
      req.user = user;
      next();
    })
  .catch( err =>{
    return next(createError(401, err.message));
  });
  });  
};