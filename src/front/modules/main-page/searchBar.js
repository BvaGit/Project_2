import renderTable from "../main"

// эту фукнцию вызывать после гет запроса и передавать туда массив из респонса

export function searchBar(array){
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

//ещё повесить листенера на keydown у инпутов и вызывать эту функцию