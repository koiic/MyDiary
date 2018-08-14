

const entryCountUrl = '/api/v1/entries/count';
const todayCountUrl = '/api/v1/entries/today/count';
const archiveCountUrl = '/api/v1/entries/archive/count';

const token = localStorage.getItem('token');
console.log("========>",token);

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
          console.log("========>",result);
          document.getElementById('entryCount').innerHTML = result.data;
        }
        document.getElementById('entryCount').innerHTML = 0;

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
      console.log("========><========",result);

      if (result.status === 'success') {
        document.getElementById('archiveCount').innerHTML = result.data;
      }
      document.getElementById('archiveCount').innerHTML = 0;

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
      console.log("========><<<<<<<<<<<<<<",result.data);

      if (result.status === 'success') {
        document.getElementById('todayCount').innerHTML = result.data;
      }
      document.getElementById('todayCount').innerHTML = 0;

    });

}

fetchEntryCount();
archiveCount();
fetchTodayCount();