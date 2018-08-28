
const url = '/api/v1/entries';
const entryCountUrl = '/api/v1/entries/count';
const todayCountUrl = '/api/v1/entries/today/count';
const archiveCountUrl = '/api/v1/entries/archive/count';
const token = localStorage.getItem('token');
console.log('---->', fetch, token);
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
}).then((result) => {
  document.getElementById('username').innerHTML = localStorage.getItem('username');
  const entryBody = document.getElementById('entryBody');
  console.log(entryBody);
  const userEntry = result.data;
  const createdMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  userEntry.map((element) => {
    const [yearCreated, monthCreated, dayCreated] = element.created_at.split('-');
    console.log(element);
    entryBody.innerHTML += `<div class="row">
    <div class="column">
    <div class="card" id="entryCard">
        <div class="justify-content-space-between">
            <div style= "width:76%">
                <p>${element.title}</p>
                <div>
                    <span>Date Created: ${yearCreated.slice(0, 2)} ${createdMonth[monthCreated - 1]} ${dayCreated.slice(0, 2)}.</span>
                </div>
            </div>
            <div>
                <a href="content.html?${element.id}"> <button class="btn account__btn"> View</button></a>
            </div>
            <div>
                <button class="btn delete-btn" onclick="deleteTrue(${element.id});">Delete </button>
            </div>

        </div>
    </div>
</div>
</div>`;
  });
  // return entryBody.innerHTML=entryData;
})
  .catch((err) => {
    console.log(err);
    return 'internal server error';
  });


const deleteTrue = (id) => {
  const url = `/api/v1/entries/archive/${id}`;
  confirm('Are you sure you want to delete this item?');
 if(confirm){
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => response.json())
      .then((result) => {
        if (result.status === 'success') {
          alert('Entries deleted successfully');
          window.location.reload(true);
        } else{
          alert('Internal server error');

        }

      })   
  }
}

const fetchEntryCount = () => {

  fetch(entryCountUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then((result) => {
      if (result.status === 'success') {
        return document.getElementById('entryCount').innerHTML = result.data[0].count;
      }
      return document.getElementById('entryCount').innerHTML = 0;

    });

}

const archiveCount = () => {

fetch(archiveCountUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then((result) => {

    if (result.status === 'success') {
      return document.getElementById('archiveCount').innerHTML = result.data[0].count;
    }else{
     return  document.getElementById('archiveCount').innerHTML = 0;

    }

  });

}

const fetchTodayCount = () => {

fetch(todayCountUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then((result) => {

    if (result.status === 'success') {
      return document.getElementById('todayCount').innerHTML = result.data[0].count;
    }else{
      return document.getElementById('todayCount').innerHTML = 0;

    }

  });

}
fetchEntryCount();
archiveCount();
fetchTodayCount();
