import {postRequest, getRequest, deleteRequest, putRequest } from '../modules/request.js';
import deletePerson from '../modules/main-page/deletePerson';
import sortData from '../modules/main-page/sortData';

function main(){

const URL = "http://localhost:2020/api/";

const fName = document.querySelector("#firstnameInput");
const lastName = document.querySelector("#lastnameInput");
const city = document.querySelector("#cityInput");
const pNumber = document.querySelector("#phonenumberInput");
const email = document.querySelector("#emailInput");
const comName = document.querySelector("#companynameInput");
const age = document.querySelector("#ageInput");
const dms = document.querySelector("#dms");
const dmsDropdown = document.querySelector(".table__dmsDropdown");

const create = document.querySelector("#create");
const update = document.querySelector("#update");
const clearAll = document.querySelector("#clearAll");

let base = 'mysql';
let idPersons = null;

function nameDB(arg){
    console.log(arg);
    switch (arg){
        case 'PostgreSQL':
            return 'pg';
        case 'MySQL':
            return 'mysql';
        case 'SQLite':
            return 'sqlite'; 
        case 'MongoDB':
            return 'mongodb'; 
        case 'Redis':
            return 'redis';
        case 'Cassandra':
            return 'cassandra';
        case 'Neo4j':
            return 'neo4j';
    }
}

function getIdPersons(){
    tbody.addEventListener('click', (e) => {
        let td = e.target.closest('tr');
        idPersons = td.getAttribute("data-index");
    });
}

function deleteBtnPerson(){
    function del(e){
        const URL = "http://localhost:2020/api/" + base + "/persons/";
        const delIndex = e.target;
        const del = delIndex.getAttribute("data-index");
        if(del !== null){
        deleteRequest(URL+del)
        .then(() => {
            getDefaultPersons(base);
        });
       }
    }
    
    tbody.addEventListener('click', (e) => {
        del(e);
    });
}

function getDefaultPersons(nameBase){
    getRequest(URL + nameBase + "/persons/" + localStorage.getItem("id_user"))
        .then(res => res.json())
        .then((data) => {
            renderTable(data);
         })
        .then(() => {
            getIdPersons();
            deletePerson();
            sortData();
         })
         .catch(() => {
            console.log("No");
         }); 
}

function putPersons(){
    const URL = "http://localhost:2020/api/" + base + "/persons/";
    const personsAdd = {
        fname: fName.value,
        lname: lastName.value,
        age: +age.value,
        city: city.value,
        phoneNumber: pNumber.value,
        email: email.value,
        companyName: comName.value,
        user_id: +localStorage.getItem("id_user")
    };
        putRequest(URL + idPersons, personsAdd)
            .then(() => {
                getDefaultPersons(base);
        });
}

function addPersons(){
    const personsAdd = {
        fname: fName.value,
        lname: lastName.value,
        age: +age.value,
        city: city.value,
        phoneNumber: pNumber.value,
        email: email.value,
        companyName: comName.value,
        user_id: +localStorage.getItem("id_user")
    };

    postRequest(URL + base + "/persons", personsAdd)
        .then(() => {
            getDefaultPersons(base);
        });
}

dmsDropdown.addEventListener("click", (e)=>{
    e.preventDefault();
    base = nameDB(e.target.innerHTML);
    dms.innerHTML = e.target.innerHTML;
    searchBar(base); 
});

create.addEventListener("click", addPersons);
update.addEventListener("click", putPersons);

const searchFirstname = document.getElementById("searchFirstname");

searchFirstname.addEventListener("change", function(e){
    const db = dms.innerHTML;
    const nameB = nameDB(db);
    searchBar(nameB);
});

const searchLastname = document.getElementById("searchLastname")

searchLastname.addEventListener("change", function(){
    const db = dms.innerHTML; 
    const nameB = nameDB(db);
    searchBar(nameB)
});

function searchBar(dbms){
    getRequest(URL + dbms + "/persons/" + localStorage.getItem("id_user"))
    .then(res => res.json())
    .then((data) => {
        filterArray(data);
        console.log("from searchBar");
     })
     .then(() => {
        getIdPersons();
        deletePerson();
        sortData();
     })
    .catch(() => {
        console.log("failed get request from db");
    }); 

    function filterArray(array){
        const searchFirstname = document.getElementById("searchFirstname")
        const searchLastname = document.getElementById("searchLastname")
        if (!searchFirstname.value && !searchLastname.value){
            renderTable(array)
        }
        if(searchFirstname.value && !searchLastname.value){
            var newArray = []
            array.forEach(element => {
                if(element.fname.includes(searchFirstname.value)){
                    newArray.push(element);
                }    
            });
            renderTable(newArray)
        }
        if(!searchFirstname.value && searchLastname.value){
            var newArray = [];
            array.forEach(element => {
                if(element.lname.includes(searchLastname.value)){
                    newArray.push(element);
                }    
            });
            renderTable(newArray)
        }
        if(searchFirstname.value && searchLastname.value){
            var newArray = [];
            array.forEach(element => {
                if(element.lname.includes(searchLastname.value) && element.lname.includes(searchLastname.value)){
                    newArray.push(element);
                }    
            });
            renderTable(newArray);
        }
    }
}

function clerAll(){
    
}

deleteBtnPerson();
getDefaultPersons(base);

}

export function renderTable(table){
    const tBody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    for(let i = 0; i < table.length; i++){
        const elementTr = document.createElement('tr');
        elementTr.classList.add("tbody__tr");
        elementTr.setAttribute("data-index", table[i].id);
        elementTr.innerHTML = `
        <td class="tr__td td-firstName">${table[i].fname}</td>
        <td class="tr__td td-lastName">${table[i].lname}</td>
        <td class="tr__td td-age">${table[i].age}</td>
        <td class="tr__td td-city">${table[i].city}</td>
        <td class="tr__td td-phoneNumber">${table[i].phoneNumber}</td>
        <td class="tr__td td-email">${table[i].email}</td>
        <td class="tr__td td-companyName">${table[i].companyName}</td>
        <td class="tr__button"><button class="panel__control-delete panel-control-style delete-person" data-index="${table[i].id}">&#128465;</button></td>
        `;
        tBody.append(elementTr);
    }
}

export default main;