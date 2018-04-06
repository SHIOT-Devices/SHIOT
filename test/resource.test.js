'use strict';

const request = require('superagent');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const Resources = require('../model/resources.js');
require('jest');

const url = 'http://localhost:3000';

let tempToken = undefined;

const testUser = {
  username: 'Jainway ' + Math.random(),
  password: 'engage'
};

const testResource = {
  name: 'Voyager'
};

describe('Resource routes', function(){
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Resources.remove({})
    ])
    .then(() => done());
  });
  describe('POST: /api/resource', () => {
    beforeEach( done =>{
      new User(testUser)
      .generatePasswordHash(testUser.password)
      .then( user => user.save())
      .then( user =>{
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        console.log('resource-40 TOKEN: ', token);
        tempToken = token;
        done();
      })
      .catch(done);
    });

    it('should return a resource', done =>{
      request.post(`${url}/api/resource`)
      .send(testResource)
      .set('Authorization',`Bearer ${tempToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(testResource.name);
        expect(res.body.userId).toEqual(this.tempUser._id.toString());
        done();
      });
    });
  });
  describe('GET: /api/:resourceId', () => {
    beforeEach( done => {
      new User(testUser)
      .generatePasswordHash(testUser.password)
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token =>{
        tempToken = token;
        done();
      })
      .catch(done);
    });

    beforeEach( done =>{
      testResource.userId = this.tempUser._id.toString();
      new Resource(testResource).save()
      .then( resource =>{
        this.tempResource = resource;
        done();
      })
      .catch(done);
    });
    afterEach(() => {
      delete testResource.userId;
    });
    it('should return a resource', done => {
      request.get(`${url}/api/${this.tempResource._id}`)
      .set({
        Authorization: `Bearer ${tempToken}`
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        exect(res.body.name).toEqual(testResource.name);
        expect(res.body.userId).toEqual(this.tempUser._id.toString());
        done();
      });
    });
  });
});
//test//

