function valid(login, pass){

    if(login === "" && pass === ""){
        return false;
    }

    if((login < 5 && login > 20) && (pass < 5 && pass > 20)){
        return false;
    }


    return true;
}


export default valid;