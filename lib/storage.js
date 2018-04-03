'use strict';

const User = require('../model/user.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

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

module.exports = save;
// module.exports = {seed, save, get, getAll, remove, removeAll};
