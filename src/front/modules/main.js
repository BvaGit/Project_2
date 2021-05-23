import {postRequest, getRequest } from '../modules/request.js';

function main(){

const fName = document.querySelector("#firstnameInput");
const lastName = document.querySelector("#lastnameInput");
const city = document.querySelector("#cityInput");
const pNumber = document.querySelector("#phonenumberInput");
const email = document.querySelector("#emailInput");
const comName = document.querySelector("#companynameInput");
const age = document.querySelector("#ageInput");
const dms = document.querySelector("#dms");
const dmsDropdown = document.querySelector(".table__dmsDropdown");


function nameDB(arg){
    switch (arg){
        case 'PostgreSQL':
            return 'pg';
        case 'MySQL':
            return 'mysql'; 
    }
}

function renderTable(table){
    const tBody = document.querySelector("#tbody");
    for(let i = 0; i < table.length; i++){
        const elementTr = document.createElement('tr');
        elementTr.classList.add("tbody__tr");
        elementTr.innerHTML = `
        <td class="tr__td td-firstName">${table[i].fname}</td>
        <td class="tr__td td-lastName">${table[i].lname}</td>
        <td class="tr__td td-age">${table[i].age}</td>
        <td class="tr__td td-city">${table[i].city}</td>
        <td class="tr__td td-phoneNumber">${table[i].phoneNumber}</td>
        <td class="tr__td td-email">${table[i].email}</td>
        <td class="tr__td td-companyName">${table[i].companyName}</td>
        <td class="tr__button"><button class="panel__control-delete panel-control-style delete-person">&#128465;</button></td>
        `;
        tBody.append(elementTr);
    }

}

getRequest("http://localhost:2020/api/"+"mysql"+"/persons/"+localStorage.getItem("id_user"))
.then(res => res.json()).then((data)=>{
    console.log(data);
});

const personsDB = {
    fname: "qwerty",
    lname: "asdf",
    age: 23,
    city: "Dnepr",
    phoneNumber: "(000)-000-0000",
    email: "afsdf@sdfds.com",
    companyName: "WoW",
    user_id: +localStorage.getItem("id_user")
};

dmsDropdown.addEventListener("click", (e)=>{
    e.preventDefault();
    const nameB = nameDB(e.target.innerHTML);
    dms.innerHTML = e.target.innerHTML;
    console.log( personsDB)
    postRequest("http://localhost:2020/api/"+nameB+"/persons", personsDB).then(() => {
        getRequest("http://localhost:2020/api/"+nameB+"/persons/all")
        .then(res => {
        console.log(res.json());
    });
    });

});










}


export default main;