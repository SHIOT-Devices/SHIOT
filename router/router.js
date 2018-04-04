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


router.post('/user', bodyParser, (request, response) => {
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


// router.put()


// router.delete()

module.exports = router;