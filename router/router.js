'use strict';

const express = require('express');
const Router = express.Router();
const User = require('..model/user.js');
const storage = require('../lib/storage.js');

// Router.get()


Router.post('/user', (request, response) => {
  let user = {
    username: request.body.username,
    password: request.body.password
  };

  storage.save(user)
    .then(user => {
      response.status('Status 200 ',200);
      response.send(user);
    });
});


// Router.put()


// Router.delete()

module.exports = router;