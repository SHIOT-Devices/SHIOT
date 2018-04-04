'use strict';

const User = require('../model/user.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/midProject');

//GET
const get = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id: id}, (error, user) => {
      resolve(user);
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    User.find((error, users) => {
      resolve(users);
    });
  });
};

//SAVE
const save = (user) => {
  let userModel = new User({
    username: user.username,
    password: user.password
  });

  return new Promise((resolve, reject) => {
    userModel.save((error, savedUser) => {
      if(error) {
        throw error;
        console.log('User Not Saved');
      };
      resolve(savedUser);
      console.log('User Saved');
    });
  });
};

module.exports = {save, get, getAll};
// module.exports = {seed, save, get, getAll, remove, removeAll};
