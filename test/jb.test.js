'use strict';
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const request = require('supertest');
const app = require('../app');

mockgoose.prepareStorage().then(() => {
  mongoose.connect('mongodb://localhost/midProjec');
});

const User = require('../model/user.js');
const Resources = require('../model/resources.js');
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

// describe('handel token less request', () =>{
//   test('sends 401 for GET requests if no token was provided', (done) => {
//     // console.log('url',SERVER_URL + '/api/resource');
//     superagent.get(SERVER_URL + '/api/resource').catch(err =>{
//       expect(err.status).toBe(401);
//       done();
//     });
//   });
//   test('sends 401 for POST requests if no token was provided', (done) =>{
//     let newUser = getUserParams();

//     superagent.post(SERVER_URL + '/api/resource')
//     .set('Content-Type', 'application/json')
//     .send(newUser)
//     .end((err, res) =>{
//       expect(res.status).toBe(401);
//       done();
//     });
//   });
//   //I'm not sure if this is posting as the user isn't coming back with an id
//   //getting a 404
//   test('send 401 for Put request if no token was provided', (done) => {
    
//     let newUser = getUserParams();
    
//     superagent.post(SERVER_URL + '/api/resource')
//       .set('content-Type', 'application/json')
//       .send(JSON.stringify(newUser))
//       .end((err, res) => {
//         let postId = res.body._id;
//         let updatedPost = {
//           name:'poe'
//         };
//         // console.log('POSTID', res.body._id)
//         // console.log('newUser', newUser)
//         superagent.put(SERVER_URL + '/api/resource?id=' + postId)
//           .set('Content-Type', 'application/json')
//           .send(JSON.stringify(updatedPost))
//           .end((err, res) =>{
//             expect(res.status).toBe(401);
//             done();
//           });
//       });
//   })
// });

describe('handel valid authorization', () =>{
  test.skip('sends 200 for authroized GET request made with a valid id', (done) =>{
    let newUser = getUserParams();
    let token;
    let postId;
    superagent.post(SERVER_URL + '/api/signup')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          console.log('Res', res.body, res.auth);
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
  test('should get resources', (done) => {
    console.log('hi');
    request(app).get('/api/resource-test')
    .then(resources => {
      console.log('RESOURCES', resources);
      done();
    });
  });
});

