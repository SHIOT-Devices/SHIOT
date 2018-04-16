'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const Resources = require('../model/resources.js');
const server = require('../lib/server.js');
require('jest');
require('dotenv').config();
const SERVER_URL = 'localhost:3000';
function getUserParams() {
  return {
    username: 'roseeeee' + Math.random(),
    password: 'cat',
  };
};
const resource = {
  name: 'test game',
};
describe('auth', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  describe('handel token less request', () => {
    test('sends 401 for GET requests if no token was provided', (done) => {
      console.log('url', SERVER_URL + '/api/controls');
      superagent.get(SERVER_URL + '/api/controls').catch(err => {
        expect(err.status).toBe(401);
        done();
      });
    });
    test('sends 401 for POST requests if no token was provided', (done) => {
      let newUser = getUserParams();
      superagent.post(SERVER_URL + '/api/controls/led')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).toBe(401);
          done();
        });
    });
  });
  describe('handel valid authorization', () => {
    let newUser = getUserParams();
    test('sends 200 for authroized GET request made with a valid id', (done) => {

      let token;
      let body;
      superagent.post(SERVER_URL + '/api/signup')
        // .set('Content-Type', 'application/json')
        // .auth(newUser.username, newUser.password)
        .send(newUser)
        .then(res => {
          token = res.body.token;
          console.log('res', res.body);
          superagent.get(SERVER_URL + '/api/controls')
            .set('Authorization', 'Bearer ' + token)
            .then(res => {
              console.log('url', SERVER_URL + '/api/controls');
              expect(res.status).toEqual(200);
              done();
            });
        });
    });
    test('should sign user in', done => {
      return superagent.get(SERVER_URL + '/api/signin')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
  // describe('handel valid authorization', () => {
  //   test('sends 200 for authroized GET request made with a valid id', (done) => {
  //     let newUser = getUserParams();
  //     let token;
  //     superagent.post(SERVER_URL + '/api/sigin')
  //       .set('Content-Type', 'application/json')
  //       .auth(newUser.username, newUser.password)
  //       .send(JSON.stringify(newUser))
  //       .then(res => {
  //         token = res.body.token;
  //         superagent.get(SERVER_URL + '/api/controls')
  //           .set('Authorization', 'Bearer ' + token)
  //           .then(res => {
  //             console.log('url', SERVER_URL + '/api/controls');
  //             console.log('95 body', res.body.name);
  //             expect(res.body.name).toEqual(res.body.name);
  //             done();
  //           });
  //       });
  //   });
  // });
  describe('GET: /api/controls', () => {
    let testUser = getUserParams();
    let tempToken = undefined;
    beforeEach(done => {
      return new User(testUser)
        .generatePasswordHash(testUser.password)
        .then(user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then(token => {
          tempToken = token;
          console.log('token', tempToken);
          done();
        })
        .catch(done);
    });
    it('should  go to controls page', done => {
      return superagent.get(SERVER_URL + '/api/controls')
        .set('Authorization', 'Bearer ' + tempToken)
        .end((err, res) => {
          if (err) return done(err);
          console.log('token', tempToken);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
  ///////////////////////////////////////////////////
  //   describe('GET: /api/signin', () => {
  //     let testUser = getUserParams();
  //     let tempToken = undefined;
  //     beforeEach( done => {
  //       return new User(testUser)
  //       .then(user => {
  //         user.generatePasswordHash(testUser.password)
  //       })
  //       .then( () => {
  //         done();
  //       })
  //       .catch(done);
  //     });
  //     it.only('should sign user in', done => {
  //       return superagent.get(SERVER_URL + '/api/signin')
  //       .set('Content-Type', 'application/json')
  //       .auth(testUser.username, testUser.password)
  //       .end((err, res) => {
  //         if(err) return done(err);
  //         expect(res.status).toEqual(200);
  //         done();
  //       });
  //     });
  //   });
})