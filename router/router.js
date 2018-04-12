'use strict';
//This router is for creating a new user
//and signing in
const express = require('express');
const Router = express.Router;
const User = require('../model/user.js');
const storage = require('../lib/storage.js');
const basicAuth = require('../lib/basic-auth-middleware.js')
const bodyParser = require('body-parser').json();

const authRouter = new Router();


/////////////////aarons code/////////////////////////////////
// router.get('/user', (request, response) => {
//   if (request.query.id) {
//     let id = request.query.id;
//     storage.get(id)
//       .then(song => {
//         response.send(song);
//       });
//   } else {
// storage.getAll()
//   .then(users => {
//     response.send(users);
//   });
//     console.error(error);
//     console.log('this user is not SHIoT');
//   };
// });

// router.get('/admin', (request, response) => {
//   storage.getAll()
//     .then(users => {
//       response.send(users);
//     });
// });
//////////////////////aarons code/////////////////////////
//create an account 

authRouter.post('/api/signup', basicAuth, (req, res) => {
  console.log('HIT THE POST ROUTE');
  console.log('request.headers', req.headers);
  console.log('request.auth:::', req.auth);
  //TODO:fill out
  // auth object needs to be attached to body, so it needs to run through jsonparse
  let password = req.auth.password;
  delete req.auth.password;
  let user = new User(req.auth);
  // console.log('user',user);
  user.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.send(token));
});

//signin to account, after we signin a token will generate and be used to authorize us to specific routes
authRouter.get('/api/signin', basicAuth, (req, res) => {
  //TODO:fillout
  //passing basicAuth to check the authheader, see basic-auth-middlewear
  //token is not here yet
  
  // let username = document.getElementById('login-username');
  // let password = document.getElementById('login-password');

  User.findOne({ username: req.auth.username })
    .then(user => user.comparePasswordHash(req.auth.password))
    .then(user => user.generateToken())
    .then(token => res.send(token));

  // res.sendFile(__dirname + '/public/signin.html');
});

/////////////////////////aarons code////////////////
// router.post('/user', bodyParser, (request, response) => {
//   let user = {
//     username: request.body.username,
//     password: request.body.password
//   };

//   storage.save(user)
//     .then(user => {
//       console.log('passed saved function');
//       response.status(200);
//       response.send(user);
//     });
// });


// router.put()


// router.delete()
///////////////////////////////////////////////////////////////////
module.exports = authRouter;