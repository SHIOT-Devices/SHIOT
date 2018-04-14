'use strict';
require('dotenv').config();
console.log('URI?', process.env.MONGODB_URI);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const User = require('../model/user');
const Resource = require('../model/resources.js');

var MY_ID = undefined;
Promise.all([
  User.remove(),
  Resource.remove()
])
.then(() =>{


  let me = new User({
    username:'me',
    password: 'icandothis'
  });
  let you = new User({
    username:'you',
    password: 'bleh'
  });

  MY_ID = me._id;
  console.log('Created', me.username);
  console.log('Created', me._id);
  console.log('Created', you.username);
  return Promise.all([
    me.save(),
    you.save()
  ]);
})
.then(users =>{
  console.log('Users saved');
  let testResource =  new Resource({
    name:'thing',
    userId: users[0]._id
  }); 
  let testResourceTwo =  new Resource({
    name:'thing',
    userId: users[1]._id
  }); 
  return Promise.all([
    testResource.save(),
    testResourceTwo.save()
  ]);
})
.then(() =>{
  Resource.find({
    userId: MY_ID
  })
  .then(resources =>{
    console.log('me resource name:');
    resources.forEach(resource =>{
      console.log(resource.name);
    });
  });
});