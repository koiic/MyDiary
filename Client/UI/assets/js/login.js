

function login(e) {
  e.preventDefault();


  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  const requestBody = {
    username, password,
  };

  console.log(requestBody);
  const url = 'http://localhost:5000/api/v1/auth/login';

  const header = {
    'Content-Type': 'application/json',
  };

  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'success') {
        const usertoken = result.token;
        const name = result.username;
        localStorage.setItem('token', usertoken);
        localStorage.setItem('username', name);
        window.location.replace('dashboard.html');
      } else{
        alert(result.message);
      }
    });
}

document.getElementById('login').addEventListener('submit', login);

