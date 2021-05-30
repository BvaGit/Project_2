function valid(login, pass){

    const minCharUpper = 65;
    const maxCharUpper = 90;
    const minCharLow = 97;
    const maxCharLow = 122;
    const minNumbChar = 48;
    const maxNumbChar = 57;

    if(login === "" && pass === ""){
        return false;
    }

    if((login.length < 5 || login.length > 20) || (pass.length < 5 || pass.length > 20)){
        return false;
    }

    if(login.length >= 5 && login.length <= 20){
      for(let char of login){
          if(char.charCodeAt(0) <  minNumbChar || char.charCodeAt(0) > maxNumbChar && char.charCodeAt(0) < minCharUpper){
                return false;
          }

          if (char.charCodeAt(0) > maxCharUpper && char.charCodeAt(0) < minCharLow || char.charCodeAt(0) > maxCharLow) {
                return false;
          }
      }
    }

    return true;
}
export default valid;


//str.trim()