"use strict";
var _a;
exports.__esModule = true;
var moment = require("moment");
// const moment = require('moment');
var dat;
// console.log(moment().format('YYYY-MMMM'));
var da = moment().format('LLLL');
console.log("--->", da);
console.log('aaaaaa');
// August 17th 2022, 12:37:01 pm
;
var User = /** @class */ (function () {
    function User(UsersData) {
        this.UsersData = UsersData;
    }
    // @userCreatedDate()
    User.prototype.addUser = function (arr) {
        this.UsersData.push(arr);
        var placeholder = document.querySelector("#data-output");
        var out = "";
        out = "<tr>\n<td>" + arr[0] + " </td>\n<td>" + arr[1] + "</td>\n<td>" + arr[2] + "</td>\n<td>" + arr[3] + "</td>\n<td>" + arr[4] + "</td>\n<td>" + arr[5] + "</td>\n<td>" + arr[6] + "</td>\n<td>" + dat + "</td>\n\n<td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n</tr>";
        placeholder.innerHTML += out;
        console.log(out);
        console.log(user);
    };
    User.prototype.buttons = function (e) {
        var ide = e.parentNode.parentNode;
        var prevData = ide;
        console.log(ide);
        ide.contentEditable = "true";
        ide.id = "edit";
        console.log("edit");
        document.getElementById("buttons").contentEditable = "false";
        //  var editElem = document.getElementById("edit");
        var saveBtn = document.getElementById("saveid");
        if (!saveBtn) {
            //#myElementID element DOES NOT exist
            var savebutton = document.createElement("button");
            savebutton.innerHTML = "Save";
            savebutton.className = "save";
            savebutton.id = "saveid";
            document.getElementById("btn").appendChild(savebutton);
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
            document.getElementById("btn").appendChild(cancelButton);
            cancelButton.onclick = function () {
                cancelTr(prevData, this, cancelButton, savebutton);
            };
        }
        function saveEdits() {
            console.log("saveEdits");
            //get the editable element
            var editElem = document.getElementById("edit");
            //get the edited element content
            var userVersion = editElem.innerHTML;
            //save the content to local storage
            localStorage.userEdits = userVersion;
            //write a confirmation to the user
            //   document.getElementById("update").innerHTML="Edits saved!";
            document.getElementById("btn").removeChild(savebutton);
            document.getElementById("btn").removeChild(cancelButton);
            savebutton.addEventListener("click", saveEdits);
        }
    };
    User.prototype.removeTr = function (e) {
        var ide = e.parentNode.parentNode;
        console.log(ide);
        var p = ide.parentNode;
        p.removeChild(ide);
        // document.getElementById("btn").removeChild(savebutton);
    };
    return User;
}());
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "subscriber";
})(Role || (Role = {}));
var UsersData = [];
var columnData = [];
function hideTable() {
    document.getElementById("table").style.visibility = "hidden";
}
function load() {
    document.getElementById("load").innerText = "Refresh Data";
    document.getElementById("table").style.visibility = "visible";
    fetch("data.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (users) {
        var placeholder = document.querySelector("#data-output");
        var out = "";
        var i = 0;
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user_1 = users_1[_i];
            columnData.push(user_1.firstName);
            columnData.push(user_1.middleName);
            columnData.push(user_1.lastName);
            columnData.push(user_1.email);
            columnData.push(user_1.phoneNumber);
            columnData.push(user_1.Role);
            columnData.push(user_1.Address);
            columnData.push(user_1.Doj);
            out += "\n             <tr id=\"t" + i + "\">\n                <td>" + user_1.firstName + " </td>\n                <td>" + user_1.middleName + "</td>\n                <td>" + user_1.lastName + "</td>\n                <td>" + user_1.email + "</td>\n                <td>" + user_1.phoneNumber + "</td>\n                <td>" + user_1.Role + "</td>\n                <td>" + user_1.Address + "</td>\n                <td>" + user_1.Doj + "</td>\n                <td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n               \n             </tr>\n          ";
            i++;
            UsersData.push(columnData);
        }
        console.log(UsersData);
        placeholder.innerHTML = out;
        console.log("loaded");
    });
}
console.log(UsersData);
var user = new User(UsersData);
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target[5].value in Role) {
        user.addUser(e);
    }
    else {
        alert(e.target[5].value +
            " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
        return;
    }
});
function cancelTr(p, e, btn, sbtn) {
    var index = p.rowIndex;
    console.log(UsersData[index]);
    // console.log(p.cells);
    console.log(UsersData);
    for (var i = 0; i < UsersData[index].length; i++) {
        p.cells[i].innerHTML = UsersData[index][i];
    }
    document.getElementById("btn").removeChild(sbtn);
    document.getElementById("btn").removeChild(btn);
}
