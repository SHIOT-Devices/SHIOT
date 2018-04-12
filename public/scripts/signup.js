'use strict';
console.log('JS loaded');

$('#signup-form').on('submit', (event) => {
  event.preventDefault();
  console.log('EVENT', event.target);
  const username = $('input[name=signup-username]').val();
  console.log('username', username);
  const password = $('input[name=signup-password]').val();
  console.log('password', password);
  let hash = btoa(`${username}:${password}`);
  //let token = JSON.parse(localStorage.token) CONTROLS/ADMIN
  signupFunction(hash);
});

const signupFunction = (hash) => {//token CONTROLS/ADMIN
  $.ajax({
    url: 'http://localhost:3000/api/signup',
    method: 'POST',
    headers: {
      Authorization: `Basic ${hash}`
      //Authorization: `Bearer ${token}`   CONTROLS/ADMIN
    }
  })
    .then(results => {
      console.log('results', results);
    });
};