'use strict';

const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const storage = require('../lib/storage.js');
const bodyParser = require('body-parser').json();

router.get('/user', (request, response) => {
  if (request.query.id) {
    let id = request.query.id;
    storage.get(id)
      .then(song => {
        response.send(song);
      });
  } else {
    // storage.getAll()
    //   .then(users => {
    //     response.send(users);
    //   });
    console.error(error);
    console.log('this user is not SHIoT');
  };
});

router.get('/admin', (request, response) => {
  storage.getAll()
    .then(users => {
      response.send(users);
    });
});


router.post('/user', (request, response) => {
  let user = {
    username: request.body.username,
    password: request.body.password
  };

  storage.save(user)
    .then(user => {
      console.log('passed saved function');
      response.status(200);
      response.send(user);
    });
});


//PUT
router.put('/user', (request, response) => {
  console.log('router.PUT hit');
  let id = request.query.id;
  console.log('REQUEST.BODY ',request.body);
  storage.get(id)
    .then(user => {
      console.log('router.js-55', user);
      if(request.body.username) {
        user.username = request.body.username;
      }
      if(request.body.password) {
        user.password = request.body.password;
      }

      user.save((error, user) => {
        if(error) {
          throw(error);
        };
        response.send(user);
      });
    });
});

//DELETE
router.delete('/user', (request, response) => {
  if(request.query.id) {
    let id = request.query.id;
    storage.remove(id)
      .then(user => {
        response.send(`User Removed ${user}`);
      });
  } else {
    storage.removeAll()
      .then(users => {
        response.send(`All Users Removed ${users}`);
      });
  };
});

module.exports = router;