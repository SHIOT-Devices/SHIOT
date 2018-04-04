'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/user';

function getUserParams() {
  // using + Math.rabdom() to avoid duplicate user errors
  return {
    username: 'bill' + Math.random(),
    password: 'windows95'
  };
};
describe('/user', () => {
  it('should return status 200 with successful request', (done) => {
    let params = getUserParams();
    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});
