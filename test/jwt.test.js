'use strict';

const jwt = require('jsonwebtoken');
const superagent = require('superagent');
require('jest');

let path = 'http://localhost:3000';

// manually verify as a valid token.
it('it should verify token', function (done) {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVjNTEyZGYzNTkzNGQ5ZWY3ZjdjZTUyODQ3ZThiMTg0ZDhmYzUwNjRlOWZlMTc1NWE1Yzk2MGNlZTlhYjdkMmQiLCJpYXQiOjE1MjM0OTI1NDF9.jcN2x4sWeWM_2nR1NPwECO7_5XPAwS3YHas4kp9TMGI';
  jwt.verify(token, 'ididntdoit', function (err, decoded) {
    if (err) {
      consle.err(err);
    }
    // console.log(decoded);
    expect(decoded).toBeDefined();
    done();
  });
});

it('it should run the token through bearer-auth-middlewear', function (done) {
  superagent.get(path + '/api/resource')
    .then(result => {
      // console.log('result=', result.body);
      done();
    });
});