document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // document is ready. Do your stuff here
    const url = '/api/v1/entries';
    const token = localStorage.getItem('token');
    console.log('---->', fetch, token);
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
      }).then((result) => {
        console.log(result);
        document.getElementById('username').innerHTML = localStorage.getItem('username');
        const entryBody = document.getElementById('entryCard');
        console.log(entryBody);
        const userEntry = result.data;
        const createdMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        userEntry.map((element) => {
          const [yearCreated, monthCreated, dayCreated] = element.created_at.split('-');
          console.log(element);
          entryBody.innerHTML += `
            <div class="column all-entry-width">
                <div class="card">
                    <a href="content.html?${element.id}">
                        <div class="card__image">
                            <img class="img__shelter" src="./assets/images/noteroom-icon.png">
                        </div>
                        <p class="text-format">${element.title}</p>
                        <p class="date-color">Created date : ${dayCreated.slice(0, 2)} - ${monthCreated.slice(0, 2)} - ${yearCreated.slice(0, 2)}</p>
                    </a>

                </div>
            </div>`;
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Internal server error');
      });
  }
};
