
const url = '/api/v1/entries';
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
                <button class="btn delete-btn" onclick="deleteTrue();">Delete </button>
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


const deleteTrue = () => {
 return confirm('Are you sure you want to delete this item?');
};
