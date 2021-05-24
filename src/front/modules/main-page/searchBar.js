import renderTable from "../main"
import getRequest from "../request"


function getDefaultPersons(nameBase){
    getRequest(URL + nameBase + "/persons/" + localStorage.getItem("id_user"))
        .then(res => res.json())
        .then((data) => {
             renderTable(data);
         })
        .then(() => {
             deletePerson();
             deleteBtnPerson();
         })
         .catch(() => {
             console.log("No");
         }); 
}


export function searchBar(dbms){

    getRequest("http://localhost:2020/api/" + dbms + "/persons/" + localStorage.getItem("id_user"))
        .then(res => res.json())
        .then((data) => {
            filterArray(data);
         }).then(() => {
            deletePerson();
            deleteBtnPerson();
        })
        .catch(() => {
            console.log("No");
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

//ещё повесить листенера на change у инпутов и вызывать эту функцию