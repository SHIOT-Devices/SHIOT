'use strict';
//the idea here is, you must have the token and secret to access these routes

const express = require('express');
const Router = express.Router;
const createError = require('http-errors');
const User = require('../model/user.js');
const Resource = require('../model/resources.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middlewear.js');
const requestIp = require('request-ip');
// const cors = require('cors');
const socket = require('socket.io');
const request = require('request');
const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');
const resourceRouter = new Router();
//post, bearAuth will check if the user is authorized
//when we make a post, it will check the user object which will 
// have a token, then it will mov on to bodyparcer and then it will run the CB
resourceRouter.post('/api/resource', bearerAuth, (req, res) => {

  // console.log('req-user_Id-resource-router', req.user);


  req.body.userId = req.user._id;
  // console.log('req-user_Id-resource-router', req.body);
  return new Resource(req.body).save()
    .then((resource) => {
      res.json(resource);
      // console.log('resource', resource);
    })
    .catch(err => console.log(err));
  //need to fill
});

// new test route
resourceRouter.get('/api/admin', bearerAuth, (req, res) => {
  res.sendFile('admin.html', {root:'./public'});
});

// resourceRouter.get('/api/ping', (req, res) => {
//   res.send('pong!');
// });

let usedBy = '';

// Post request to run function and return page.
resourceRouter.post('/api/controls/led',(req, res) => {
  usedBy = requestIp.getClientIp(req);
  switchLed(); // exicutes the function to toggle LED state.
  // console.log(request.connection.remoteAddress);
  
  // console.log(requestIp.getClientIp(req));
  res.sendFile(__dirname + '/public/index.html'); // returns the previous page.
});
// using httpie  http POST 192.168.10.13:3000/led

// Heartbeat
// let hbServer = 'http://192.168.10.10:3002/heartbeat';
let hbServer = 'https://shiot-remote-server.herokuapp.com/heartbeat';
setInterval(function(){
  // console.log('heartbeat');
  // this will eventually be a configuration setting in the .env file.
  request.post(hbServer, () => {
  });
}, 1000 * 3);

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    usedBy = 'button';
    switchLed();
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
let isLedOn = false;
function switchLed() {
  isLedOn = !isLedOn;
  let state = 0;
  let message = 'off';

  if (isLedOn) {
    state = 1;
    message = 'on';
  };
  led.writeSync(state);
  console.log('Led turned ', message, '@', new Date(), 'by:', usedBy);

  io.emit('ledStatus', isLedOn);
};



module.exports = resourceRouter;