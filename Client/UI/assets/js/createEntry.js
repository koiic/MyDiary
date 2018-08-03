

function createEntry(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const note = document.getElementById('note').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const token = localStorage.getItem('token');
  const url = 'http://localhost:5000/api/v1/entries';

  const requestBody = {
    title, note, imageUrl,
  };
  console.log(requestBody);


  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  })
    .then(response => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === 'successful') {
        window.location.reload(true);
      } else {
        return alert(result.message);
      }
    }).catch(err => alert(err));
}

document.getElementById('createEntry').addEventListener('submit', createEntry);
