function submitdetails(event) {
  event.preventDefault();
  const expenses = event.target.expenses.value;
  const description = event.target.description.value;
  const phoneNumber = event.target.phoneNumber.value;

  const obj = {
    expenses,
    description,
    phoneNumber,
  };

  axios
    .post(
      "https://crudcrud.com/api/79828dbb37c442218e9f5734087a0573/appointmentData",
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

  // localStorage.setItem(obj.description,JSON.stringify(obj))   //this line store the appionment in the local storage
  // showuseronscreen (obj)

  
}
window.addEventListener("DOMContentLoaded", () => {
    //down code is to get data from the network when the page get reload
    axios
      .get(
        "https://crudcrud.com/api/79828dbb37c442218e9f5734087a0573/appointmentData"
      )
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
  

function showuseronscreen(obj) {
  // document.getElementById('expanses').value='';
  // document.getElementById('description').value='';
  // document.getElementById('phoneNumber').value='';
  // if(localStorage.getItem(obj.expenses)!==null){
  //     removeUserFromScreen(obj.email)
  // }

  const parentelem = document.getElementById("listofitems");
  const childelem = document.createElement("li");
  childelem.textContent =
    obj.expenses + " - " + obj.description + " - " + obj.phoneNumber;

  const deletebutton = document.createElement("input");
  deletebutton.type = "button";
  deletebutton.value = "Delete Input";

  deletebutton.onclick = () => {
    localStorage.removeItem(obj.description);
    parentelem.removeChild(childelem);
  };

  const editbutton = document.createElement("input");
  editbutton.type = "button";
  editbutton.value = "Edit Input";

  editbutton.onclick = () => {
    localStorage.removeItem(obj.description);
    parentelem.removeChild(childelem);
    document.getElementById("expenses").value = obj.expenses;
    document.getElementById("description").value = obj.description;
    document.getElementById("phoneNumber").value = obj.phoneNumber;
  };

  childelem.appendChild(deletebutton);
  childelem.appendChild(editbutton);

  parentelem.appendChild(childelem);

  expenses.value = "";
  description.value = "";
  phoneNumber.value = "";
}
