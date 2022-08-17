let dat: string;

function userCreatedDate() {
  console.log("Called");
  
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    let val = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let arr: Array<string> = [];
      console.log(args[0].target[0].value);
      for (let j = 0; j < 7; j++) {
        arr.push(args[0].target[j].value);
      }
      let d: Date = new Date();
      let dt =
        d.getDate() +
        " " +
        d.toLocaleString("en-US", { month: "long" }) +
        " " +
        d.getFullYear() +
        " Time: " +
        d.getHours() +
        ":" +
        d.getMinutes();
      arr.push(dt.toString());
      dat = dt.toString();
      //   console.log(dat);
      return val.apply(this, [arr]);
    };
  };
}

interface UserAction <T> {
  UsersData: Array<Array<string>>;
  addUser(refer: T): void;
  // buttons(e:T):void;
  // removeTr(e: T):void;
}

class User<T> implements UserAction<T> {
  constructor(public UsersData: Array<Array<string>>) {}
  @userCreatedDate()
  addUser(arr: any) {
    this.UsersData.push(arr);
    let placeholder = document.querySelector("#data-output");
    var out = "";
    out = `<tr>
<td>${arr[0]} </td>
<td>${arr[1]}</td>
<td>${arr[2]}</td>
<td>${arr[3]}</td>
<td>${arr[4]}</td>
<td>${arr[5]}</td>
<td>${arr[6]}</td>
<td>${dat}</td>

<td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
</tr>`;
    placeholder!.innerHTML += out;
    console.log(out);
    console.log(user);
  }
  

}

enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "subscriber",
}

let UsersData: Array<Array<string>> = [];
let columnData: Array<string> = [];

function hideTable() {
  document.getElementById("table")!.style.visibility = "hidden";
}

function load() {
  document.getElementById("load")!.innerText = "Refresh Data";
  document.getElementById("table")!.style.visibility = "visible";
  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      var placeholder = document.querySelector("#data-output");
      let out = "";
      let i = 0;
      for (let user of users) {
        columnData.push(user.firstName);
        columnData.push(user.middleName);
        columnData.push(user.lastName);
        columnData.push(user.email);
        columnData.push(user.phoneNumber);
        columnData.push(user.Role);
        columnData.push(user.Address);
        columnData.push(user.Doj);

        out += `
             <tr id="t${i}">
                <td>${user.firstName} </td>
                <td>${user.middleName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.Role}</td>
                <td>${user.Address}</td>
                <td>${user.Doj}</td>
                <td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
               
             </tr>
          `;
        i++;
        UsersData.push(columnData);
      }

      console.log(UsersData);

      placeholder!.innerHTML = out;
      console.log("loaded");
    });
}
console.log(UsersData);

let user = new User(UsersData);

document.getElementById("form")?.addEventListener("submit", (e: any) => {
  e.preventDefault();
  if (e.target[5].value in Role) {
    user.addUser(e);
  } else {
    alert(
      e.target[5].value +
        " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber"
    );
    return;
  }
});



function cancelTr(p: any, e: any, btn: any, sbtn: any) {
  var index = p.rowIndex;
  console.log(UsersData[index]);

  // console.log(p.cells);
  console.log(UsersData);

  for (let i = 0; i < UsersData[index].length; i++) {
    p.cells[i].innerHTML = UsersData[index][i];
  }
  document.getElementById("btn")!.removeChild(sbtn);
  document.getElementById("btn")!.removeChild(btn);
}


function buttons(e: any) {
  var ide = e.parentNode.parentNode;
  var prevData = ide;
  console.log(ide);
  ide.contentEditable = "true";
  ide.id = "edit";
  console.log("edit");

  document.getElementById("buttons")!.contentEditable = "false";

  //  var editElem = document.getElementById("edit");
  var saveBtn = document.getElementById("saveid");
  if (!saveBtn) {
    //#myElementID element DOES NOT exist
    var savebutton = document.createElement("button");
    savebutton.innerHTML = "Save";
    savebutton.className = "save";
    savebutton.id = "saveid";

    document.getElementById("btn")!.appendChild(savebutton);
    savebutton.onclick = function () {
      saveEdits();
    };
  }

  var cancelBtn = document.getElementById("cancelid");
  if (!cancelBtn) {
    //#myElementID element DOES NOT exist

    var cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.className = "cancel";
    cancelButton.id = "cancelid";
    document.getElementById("btn")!.appendChild(cancelButton);

    cancelButton.onclick = function () {
      cancelTr(prevData, this, cancelButton, savebutton);
    };
  }

  function saveEdits() {
    console.log("saveEdits");

    //get the editable element
    var editElem = document.getElementById("edit");

    //get the edited element content
    var userVersion = editElem!.innerHTML;

    //save the content to local storage
    localStorage.userEdits = userVersion;

    //write a confirmation to the user
    //   document.getElementById("update").innerHTML="Edits saved!";
    document.getElementById("btn")!.removeChild(savebutton);

    document.getElementById("btn")!.removeChild(cancelButton);

    savebutton.addEventListener("click", saveEdits);
  }
}
function removeTr(e: any) {
  var ide = e.parentNode.parentNode;
  console.log(ide);
  var p = ide.parentNode;
  p.removeChild(ide);

  // document.getElementById("btn").removeChild(savebutton);
}