'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const createError = require('http-errors');
const result = require('dotenv').config();
if(result.error){
  throw result.error;
}
console.log('result.parresult.parsed');


//find token authorizes us to use specific routes 
let userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  findToken: {type: String, unique: true}
  // admin: false
});
//you need to add .methods when making a mongoose method
//See Instance Methods in the docs for further info
//this method will encrypt a plane text password for the db
userSchema.methods.generatePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

//this will decrypt the password when a user signs in//
userSchema.methods.comparePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    //passing plane text password and hashed password 
    //bcrypt will verify if they match
    bcrypt.compare(password, this.password,(err, match) => {
      if (err) return reject(err);
      if(!match) return reject(createError(401, 'invalid password'));
      resolve(this);
    });
  });
};

//authorization makes the token 
userSchema.methods.generateFindToken = function() {
  return new Promise((resolve,reject) => {
  
    //recersive function call
    //.call lets you use the this keyword here
    generateFindToken.call(this);
    function generateFindToken(){
      //creating 32 bit hex token 
      this.findToken = crypto.randomBytes(32).toString('hex');
      console.log('token seed', this.findToken);
      this.save();
      return resolve(this.findToken);
    };
  });
};
console.log('one seeeeecret', process.env.SECRET); 
//this will apply the token to the user obj
userSchema.methods.generateToken = function(){
  return new Promise((resolve, reject)=>{
    this.generateFindToken()
    // signes token and secret key
    .then( findToken => {

   
      
      return resolve(jwt.sign({token: findToken}, process.env.SECRET));
    })
    .catch( err => reject(err));
  });
};

let User = mongoose.model('User', userSchema);

module.exports = User;