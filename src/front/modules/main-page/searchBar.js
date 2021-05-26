import { renderTable } from "../main";
import {getRequest} from "../request";
import deletePerson from './deletePerson';
const URL = "http://localhost:2020/api/";

// export function filterArray(array){
//     const searchFirstname = document.getElementById("searchFirstname")
//     const searchLastname = document.getElementById("searchLastname")
//     if (!searchFirstname.value && !searchLastname.value){
//         renderTable(array)
//     }
//     if(searchFirstname.value && !searchLastname.value){
//         var newArray = []
//         array.forEach(element => {
//             if(element.fname.includes(searchFirstname.value)){
//                 newArray.push(element)
//             }    
//         });
//         renderTable(newArray)
//     }
//     if(!searchFirstname.value && searchLastname.value){
//         var newArray = []
//         array.forEach(element => {
//             if(element.lname.includes(searchLastname.value)){
//                 newArray.push(element)
//             }    
//         });
//         renderTable(newArray)
//     }
//     if(searchFirstname.value && searchLastname.value){
//         var newArray = []
//         array.forEach(element => {
//             if(element.lname.includes(searchLastname.value) && element.lname.includes(searchLastname.value)){
//                 newArray.push(element)
//             }    
//         });
//         renderTable(newArray)
//     }
// }

export default function searchBar(dbms){

        console.log(dbms);
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
                    newArray.push(element)
                }    
            });
            renderTable(newArray)
        }
        if(!searchFirstname.value && searchLastname.value){
            var newArray = []
            array.forEach(element => {
                if(element.lname.includes(searchLastname.value)){
                    newArray.push(element)
                }    
            });
            renderTable(newArray)
        }
        if(searchFirstname.value && searchLastname.value){
            var newArray = []
            array.forEach(element => {
                if(element.lname.includes(searchLastname.value) && element.lname.includes(searchLastname.value)){
                    newArray.push(element)
                }    
            });
            renderTable(newArray)
        }
    }
}

// const searchFirstname = document.getElementById("searchFirstname")

// searchFirstname.addEventListener("input", function(){
//     const db = dms.innerHTML 
//     const nameB = nameDB(db);
//     searchBar(nameB);
// })
// const searchLastname = document.getElementById("searchFirstname")

// searchLastname.addEventListener("input", function(){
//     const db = dms.innerHTML 
//     const nameB = nameDB(db);
//     searchBar(nameB)
// })