const id = window.location.search.split('')[1];
const url = `http://localhost:5000/api/v1/entries/${id}`;
const token = localStorage.getItem('token');
const editBtn = document.getElementById('edit');
const updateBtn = document.getElementById('update');
const title = document.getElementById('title');
const note = document.getElementById('note');

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
      document.getElementById('username').innerHTML = localStorage.getItem('username');
      const userEntry = result.data[0];
      console.log(userEntry);
      const [yearCreated, monthCreated, dayCreated] = userEntry.created_at.split('-');

      document.getElementById('title').innerHTML = userEntry.title;
      console.log(userEntry);
      document.getElementById('note').innerHTML = userEntry.note;
      return document.getElementById('createdDate').innerHTML = `${dayCreated.slice(0, 2)} - ${monthCreated.slice(0, 2)} - ${yearCreated.slice(0, 2)}`;
    }
    return console.log(result.status);
  })
  .catch((err) => {
    console.log(err);
  });

const editTrue = () => {
  title.contentEditable = true;
  note.contentEditable = true;
  editBtn.classList.add('hide');
  updateBtn.classList.remove('hide');
};

const updateEntry = () => {
  const requestBody = {
    title: title.textContent,
    note: note.textContent,
  };
  console.log(requestBody);
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),

  })
    .then(response => response.json())
    .then((result) => {
      if (result.status === 'success') {
        editBtn.classList.remove('hide');
        updateBtn.classList.add('hide');
        alert('Entries updated successfully');
        window.location.reload(true);
        // title.innerHTML = result.title;
        // note.innerHTML = result.note;
        // title.contentEditable = false;
        // note.contentEditable = false;
       
        
      } else {
        alert(result.message);
      }
    })
    .catch((err) => {
      return alert(err);
    });
};
