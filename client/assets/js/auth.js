

function createAccount(e) {
  e.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const resultMessage = document.getElementById('result');

  const requestBody = {
    firstname, lastname, username, email, password,
  };

  console.log(requestBody);
  const url = '/api/v1/auth/signup';

  const header = {
    'Content-Type': 'application/json',
  };

  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  })
  //   .then((response) => {
  //       console.log('->--->', response);
  //       return response.json();
    // })
    .then((res) => {
      res.json().then((result) => {
        console.log('work', result);
        if (result.status === 'success') {
          const token = result.data;
          console.log('tke', token);
          localStorage.setItem('token', token);
          window.location.replace('entries.html');
        }else {
          resultMessage.innerHTML = result.message;
        }
      });
    });
}

document.getElementById('createAccount').addEventListener('submit', createAccount);
