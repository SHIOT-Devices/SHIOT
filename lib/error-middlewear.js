'use strict';

const createError = require('http-errors');
require('dotenv').config();

module.exports = function(err, req, res, next){
  console.error('msg:', err.message);
  console.error('name:', err.name);
  if(err.status){
    res.status(err.status).send(err.name);
    next();
    return;
  }
  if(err.name === 'ValidationError'){
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(400, err.message);
  res.status(err.status).send(err.name);
  next();
};