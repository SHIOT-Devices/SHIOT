'use strict';
console.log('JS Loaded');

$('#signin-form').on('submit', (event) => {
  event.preventDefault();
  console.log('EVENT', event.target);
  const username = $('input[name=signin-username]').val();
  console.log('username', username);
  const password = $('input[name=signin-password]').val();
  console.log('password', password);
  let hash = btoa(`${username}:${password}`);
  signupFunction(hash);
});

const signupFunction = (hash) => {
  $.ajax({
    url: 'http://localhost:3000/api/signin',
    method: 'GET',
    headers: {
      Authorization: `Basic ${hash}`
    }
  })
    .then(results => {
      console.log('results', results);
      localStorage.token = JSON.stringify(results);
    });
};