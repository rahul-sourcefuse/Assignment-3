"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
var dat;
function userCreatedDate() {
    console.log("Called");
    return function (target, key, descriptor) {
        var val = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arr = [];
            console.log(args[0].target[0].value);
            for (var j = 0; j < 7; j++) {
                arr.push(args[0].target[j].value);
            }
            var d = new Date();
            var dt = d.getDate() + " " + d.toLocaleString('en-US', { month: 'long', }) + " " + d.getFullYear() + " Time: " + d.getHours() + ":" + d.getMinutes();
            arr.push(dt.toString());
            dat = dt.toString();
            //   console.log(dat);
            return val.apply(this, [arr]);
        };
    };
}
var User = /** @class */ (function () {
    function User(UsersData) {
        this.UsersData = UsersData;
    }
    User.prototype.addUser = function (arr) {
        this.UsersData.push(arr);
        var placeholder = document.querySelector("#data-output");
        var out = "";
        out = "<tr>\n<td>" + arr[0] + " </td>\n<td>" + arr[1] + "</td>\n<td>" + arr[2] + "</td>\n<td>" + arr[3] + "</td>\n<td>" + arr[4] + "</td>\n<td>" + arr[5] + "</td>\n<td>" + arr[6] + "</td>\n<td>" + dat + "</td>\n\n<td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n</tr>";
        placeholder.innerHTML += out;
        console.log(out);
        console.log(user);
    };
    __decorate([
        userCreatedDate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], User.prototype, "addUser", null);
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
    document.getElementById('table').style.visibility = "hidden";
}
function load() {
    document.getElementById('load').innerText = "Refresh Data";
    document.getElementById("table").style.visibility = "visible";
    fetch("data.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (products) {
        var placeholder = document.querySelector("#data-output");
        var out = "";
        var i = 0;
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            columnData.push(product.firstName);
            columnData.push(product.middleName);
            columnData.push(product.lastName);
            columnData.push(product.email);
            columnData.push(product.phoneNumber);
            columnData.push(product.Role);
            columnData.push(product.Address);
            columnData.push(product.Doj);
            out += "\n             <tr id=\"t" + i + "\">\n                <td>" + product.firstName + " </td>\n                <td>" + product.middleName + "</td>\n                <td>" + product.lastName + "</td>\n                <td>" + product.email + "</td>\n                <td>" + product.phoneNumber + "</td>\n                <td>" + product.Role + "</td>\n                <td>" + product.Address + "</td>\n                <td>" + product.Doj + "</td>\n                <td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n               \n             </tr>\n          ";
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
        alert(e.target[5].value + " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
        return;
    }
});
function removeTr(e) {
    var ide = e.parentNode.parentNode;
    console.log(ide);
    var p = ide.parentNode;
    p.removeChild(ide);
    // document.getElementById("btn").removeChild(savebutton);
}
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
function buttons(e) {
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
        savebutton.addEventListener('click', saveEdits);
    }
}
;
