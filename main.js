function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phoneNumber = event.target.phoneNumber.value;

  const obj = {
    name,
    email,
    phoneNumber,
  };

  axios
    .post(
      "https://crudcrud.com/api/11fefc659fb649758d39a6998a49a63a/appointmentData",
      obj
    )
    .then((response) => {
      showuseronscreen(response.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something went wrong </h4>";
      console.log(err);
    });

  // localStorage.setItem(obj.email,JSON.stringify(obj))   //this line store the appionment in the local storage
  // showuseronscreen (obj)

  
}


window.addEventListener("DOMContentLoaded", () => {
    //down code is to get data from the network when the page get reload
    axios
      .get(
        "https://crudcrud.com/api/11fefc659fb649758d39a6998a49a63a/appointmentData")
      .then((response) => {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
          showuseronscreen(response.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //down code is to get the data from the local storage when the page get reload
    // const localStorageObj=localStorage;
    // const localStorageKey=Object.keys(localStorageObj)

    // for(var i=0;i<localStorageKey.length;i++){
    //     const key=localStorageKey[i]
    //     const userDetailsString=localStorageObj[key];
    //     const userDetailsObj=JSON.parse(userDetailsString);
    //     showuseronscreen(userDetailsObj)
    // }
  });


function showuseronscreen(user) {

  document.getElementById('email').value='';
  document.getElementById('username').value='';
  document.getElementById('phoneNumber').value='';
  if(localStorage.getItem(user.email) !== null){
      removeUserFromScreen(user.email)
  }


  const parentNode = document.getElementById("listOfUsers");
  const childHTML=`<li id=${user._id}> ${user.name} - ${user.email} - ${user.phoneNumber}
                    <button onclick=deleteUser('${user._id}')> Delete User</button>    
                    <button onclick=editsUserDetails('${user._id}','${user.name}','${user.email}','${user.phoneNumber}')> Edit User</button>    
                    </li>`

  // const childHTML=`<li id=${user.email}> ${user.name} - ${user.email} - ${user.phoneNumber}
  //                   <button onclick=deleteUser('${user.email}')> Delete User</button>    
  //                   <button onclick=editsUserDetails('${user.email}','${user.email}','${user.phoneNumber}')> Edit User</button>    
  //                   </li>`     

   parentNode.innerHTML=parentNode.innerHTML+childHTML;  
}


//edit User
function editsUserDetails(userId,name,emailId,phoneNumber){
  
    document.getElementById('email').value=emailId;
    document.getElementById('username').value=name;
    document.getElementById('phoneNumber').value=phoneNumber;

    deleteUser(userId)

    // axios.put(`https://crudcrud.com/api/11fefc659fb649758d39a6998a49a63a/appointmentData/${userId}`)
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
}

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/11fefc659fb649758d39a6998a49a63a/appointmentData/${userId}`)
        .then((response)=>{
            removeUserFromScreen(userId)
        })
        .catch((err)=>{
            console.log(err)
        })
    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);
}

function removeUserFromScreen(userId){
    const parentNode=document.getElementById('listOfUsers');
    const childNodeToBeDeleted=document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
