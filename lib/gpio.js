'use strict';

// const gpio = require('./lib/gpio.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const socket = require('socket.io');
const cors = require('cors');
const request = require('request');
const Gpio = require('onoff').Gpio;
const led = new Gpio(18, 'out');
const button = new Gpio(4, 'in', 'both');

const server = require('../index.js').server;



const io = socket(server);

io.on('connection', function (socket) {
  let clientIp = [];
  io.emit('ledStatus', isLedOn);
  clientIp.push(socket.request.connection.remoteAddress);
  console.log('made socket connection', socket.id, clientIp);

  socket.on('ledStatus', (isLedOn) => {
    io.sockets.emit('ledStatus', isLedOn);
  });
});


let isLedOn = false;
// let usedBy = '';

// Monitors for button press event.
button.watch(function (err, value) {
  if (err) {
    throw (err);
  };
  if (value === 0) {
    // usedBy = 'button';
    // switchLed();
    led1('', 'button');
  };
});

// Resets Led to off on start.
led.writeSync(0);

// Switches LED between on and off.
const led1 = function switchLed(req, usedBy) {
  isLedOn = !isLedOn;
  let state = 0;
  let message = 'off';

  if (isLedOn) {
    state = 1;
    message = 'on';
  };
  led.writeSync(state);
  // let log;
  // log.save(`LED turned ${message} @ ${new Date()} by ${usedBy}`);
  console.log('Led turned ', message, '@', new Date(), 'by:', usedBy);
  io.emit('ledStatus', isLedOn);
};


module.exports.led1 = led1;
// module.exports.usedBy = usedBy;