document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    const url = '/api/v1/auth/profile';
    const token = localStorage.getItem('token');
    const email = document.getElementById('email');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    // const note = document.getElementById('note');

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((result) => {
        console.log(result);
        if (result.status === 'success') {
        //   document.getElementById('username').innerHTML = localStorage.getItem('username');
          const userEntry = result.data;
          console.log(userEntry);

          email.value = userEntry.email;
          firstname.value = userEntry.firstname;
          lastname.value = userEntry.lastname;
          console.log(userEntry);
        }
        return console.log(result.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
