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
   
    superagent.post(SERVER_URL + '/api/signup')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
  
          console.log('RES body', res.body);

          let userId = res.body.user._id;
          console.log('userId', userId);
          //SIGNIN ROUTE 

          let newPost = {
            name: 'wataaaaa',
            userId: userId  
          };
          console.log('NEWPOST', newPost);
          
          token = res.body.token;
          console.log('81 TOKEN', token);
          superagent.post(SERVER_URL + '/api/resource')
            .set('Content-type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(newPost)
            .end((err, res) => {
           
              if(err)console.log('ERROR');
              let postId = res.body.userId;
              console.log('89 res', res.body);
              superagent.get(SERVER_URL + '/api/resource/' + postId)
              .set('Authorization', 'Bearer ' + token)
              .end((err, res) =>{
                console.log('url',SERVER_URL + '/api/resource?id=' + postId);
                console.log('95 body',res.body)
                expect(res.name).toBe('wataaaaa');
                expect(res.status).toBe(200);
                done();
              });
            });
        });
  });
});
