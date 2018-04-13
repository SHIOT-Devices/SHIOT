'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const USER_URL = SERVER_URL + '/api/signup';

function getUserParams() {
  // using + Math.rabdom() to avoid duplicate user errors
  return {
    username: 'bill' + Math.random(),
    password: 'windows95'
  };
};
const testUser = {
  username: 'cat ' + Math.random(),
  password: 'engage'
};
describe('/user', () => {
  it('should return status 200 with successful request', (done) => {
    // let params = getUserParams();
    return superagent.post(USER_URL)
      .set('Content-Type', 'application/json')
      .send(testUser)
      .then(res => {
        console.log('res.body', res.text);
        console.log(USER_URL);
        expect(res.status).toEqual(200);
        done();
      });
  });
});

describe('/user', () => {
  it('should return status 200 with successful request', (done) => {
      // let params = getUserParams();
    return superagent.post(USER_URL)
        .set('Content-Type', 'application/json')
        .send(testUser)
        .then(res => {
          console.log('res.body', res.text);
          console.log(USER_URL);
          expect(res.status).toEqual(200);
          done();
        });
  });
});

describe('/api/signup', () => {
  it('should return status 401 if missing username', (done) => {
    let params = getUserParams();
    delete params['username'];
    superagent.post(USER_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .catch(err => {
          expect(err.status).toEqual(401);
          done();
        });
  });
}); 