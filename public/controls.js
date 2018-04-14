let parsedToken = JSON.parse(localStorage.token);

    // parsedToken = 'wrong';

    // TODO get root of site dynamically
    const root = 'http://localhost:3000';

    const url = `${root}/api/controls`;

    $.ajax({
      url,
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${parsedToken}`)
      },
    })
    .then(results => {

      console.log('Making it here means authorization passed');

        // safe to initialize page

      return results;

    }).catch(err => {
        console.error('error happened - redirecting to signin', err);
        window.location.href = "/";
    })