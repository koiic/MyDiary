document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      // document is ready. Do your stuff here
      const url = 'http://localhost:5000/api/v1/entries';
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
        })
        .then((result) => {
          console.log(result);
          document.getElementById('username').innerHTML = localStorage.getItem('username');
          const entryBody = document.getElementById('entryCard');
          console.log(entryBody);
          const userEntry = result.data; 
          const createdMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          userEntry.map((element) => {
            const [yearCreated, monthCreated, dayCreated] = element.created_at.split('-');
            console.log(element);
            entryBody.innerHTML+=`
            <div class="column all-entry-width">
                <div class="card">
                    <a href="content.html">
                        <div class="card__image">
                            <img class="img__shelter" src="./assets/images/noteroom-icon.png">
                        </div>
                        <p class="text-format">${element.title}</p>
                        <p>Created date : ${dayCreated.slice(0, 2)} - ${monthCreated.slice(0, 2)} - ${yearCreated.slice(0, 2)}</p>
                    </a>

                </div>
            </div>`
                                         
          });
          // return entryBody.innerHTML=entryData;
  
        })
        .catch((err) => {
          console.log(err);
          return 'internal server error';
        });
    }
  };
  
  // $("#monthlySignup").html(monthlySignupHtml);
  
  // var userListHtml = '';
  // for (var k = 0; k < data.userList.length; k++) {
  //     userListHtml +=    "<li>" +
  //                             "   <div class=\"c-light\">" +
  //                             "        <div class=\"row\">" +
  //                             "            <div class=\"col-xs-4\">"+ data.userList[k][0] + "</div>" +
  //                             "                <div class=\"col-sm-6\">" + "</div>" +
  //                             "                  <div class=\"col-xs-4\"> Value : <span>&#8358;</span><label class=\"label-default\"></label>"+ data.userList[k][1].toLocaleString() + "</div>" +
  //                             "                  <div class=\"col-xs-4\"> Volume : <span></span><label class=\"label-default\"></label>"+ data.userList[k][2] + "</div>" +
  //                             "        </div>" +
  //                             "    </div>" +
  //                             "</li>";
  // }
  
  //  $("#userList").html(userListHtml);
  
  