'use strict';

// let parsedToken = JSON.parse(localStorage.token);

// // parsedToken = 'wrong';

// // TODO get root of site dynamically
// const root = window.location.href;

// const url = `${root}/controls`;

// $.ajax({
//   url,
//   method: 'GET',
//   beforeSend: function (xhr) {
//     xhr.setRequestHeader('Authorization', `Bearer ${parsedToken}`);
//   },
// })
//   .then(results => {

//     console.log('Making it here means authorization passed');

//     // safe to initialize page

//     return results;

//   }).catch(err => {
//     console.error('error happened - redirecting to signin', err);
//     window.location.href = "/";
//   })

// Connection to SHIoT Device
const socket = io();
console.log('server:', window.location.href);

// Query DOM
let form = document.getElementById('controls');
let ledStatus = document.getElementById('ledStatus');

// prevents page from refreshing and getting new socket id
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(form.action, {
    url: `${window.location.href}api/controls/led2`,
    method: 'POST'
  });
});

//   function reDirect(parsedToken) {
//   $.ajax({
//     url: `${window.location.href}api/controls/led`,
//     method: 'POST',
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader('Authorization', `Bearer ${parsedToken}`)
//     },
//     // data: {},
//     // success: function () { },
//     // error: function () { },
//   })
//   // .then(results => {
//   //   // location = './controls.html';
//   //   console.log('Bearer resutls:', results);
//   // })
//   console.log('red token:', parsedToken);
// }

// Listen for events
socket.on('ledStatus', (data) => {
  let led = '';
  if (data) {
    led = 'on';
  } else {
    led = 'off';
  }

  ledStatus.innerHTML = '<p><strong>LED is currently ' + led + '</strong></p>';
});