'use strict';

const createError = require('http-errors');
//.next moves to the next middlewear 
module.exports = function(req, res, next){
  //.headers is a property on the req .authroization is a property on header
  //will return string
  console.log('8 basic request', req.headers.authorization)
  var authHeader = req.headers.authorization;
  if(!authHeader){
    return next(createError(401, 'authorization header required'));
  }
  // needs the space after basic 
  //take auth header and splits it 
  var base64str = authHeader.split('Basic ')[1];
  if(!base64str){
    return next(createError(401, 'username and password required'));

  }

  //turns back into utf8str string and splits on the :
  var utf8str = Buffer.from(base64str, 'base64').toString();
  var authArr = utf8str.split(':');
  
  //create an auth property and attach it to the request 

  req.auth = {
    username: authArr[0],
    password: authArr[1]
  };

  if(!req.auth.username){
    return next(createError(401, 'username required'));
  }
  if(!req.auth.password){
    return next(createError(401, 'password required'));
  }

  next();
};