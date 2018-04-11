'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const Resources = require('../model/resources.js');
const server = require('../lib/server.js');
require('jest');
require('dotenv').config();

const SERVER_URL = 'http://localhost:3000';
function getUserParams() {
  return {
    username: 'roseeeee' + Math.random(),
    password: 'cat',
  };
};

const resource = {
  name: 'test game',
};

beforeAll((done) => {
  server.start()
  .then(done);
  
});
afterAll((done) => {
  server.stop()
  .then(() => {
    console.log('done');
    done();
  });
});
describe('handel token less request', () =>{
  test('sends 401 for GET requests if no token was provided', (done) => {
    // console.log('url',SERVER_URL + '/api/resource');
    superagent.get(SERVER_URL + '/api/resource').catch(err =>{
      expect(err.status).toBe(401);
      done();
    });
  });
  test('sends 401 for POST requests if no token was provided', (done) =>{
    let newUser = getUserParams();

    superagent.post(SERVER_URL + '/api/resource')
    .set('Content-Type', 'application/json')
    .send(newUser)
    .end((err, res) =>{
      expect(res.status).toBe(401);
      done();
    });
  });
  

});

describe('handel valid authorization', () =>{
  test('sends 200 for authroized GET request made with a valid id', (done) =>{
    let newUser = getUserParams();
    let token;
    let postId;
    superagent.post(SERVER_URL + '/api/signup')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          console.log('Res', res.body, res.auth);
          console.log('Res text', res.text);

          let userId = res.body._id;
          //SIGNIN ROUTE 
          superagent.get(SERVER_URL + '/api/signin')
          .set('Content-Type', 'application/json')
          .auth(newUser.username, newUser.password)
          .end((err, res) => {
            let newPost = {
              name: 'wat' + Math.random(),
              userId: userId
              
            };
            
            token = res.body.token;
            superagent.post(SERVER_URL + '/api/resource')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer' + token)
            .send(newPost)
            .end((err, res) => {
              postId = res.body.id;
              
              superagent.get(SERVER_URL + '/api/resource?id' + postId)
              .set('Authorization', 'Bearer' + token)
              .end((err, res) =>{
                expect(res.body.name).toBe('wat');
                expect(res.status).toBe(200);
                done();
              });
            });
          });
        });
  });
});