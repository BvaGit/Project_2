import {postRequest, getRequest } from '../modules/request';
import valid from "./valid";

function registration(){
    const url = "http://18.217.70.70:2020/api/mysql/users";
    const regLogin = document.querySelector("#reglogin");
    const regPass = document.querySelector("#regpass");
    const confirmRegPass = document.querySelector("#confirmregpass");
    const regBtn = document.querySelector(".reg__btn");

    function register (){
        if(valid(regLogin.value, regPass.value) && confirmRegPass.value !== ""){
            if(regPass.value === confirmRegPass.value){
                const user = {
                    login: regLogin.value,
                    password: regPass.value
                };
                postRequest(url, user).then(()=>{
                    document.location.href = "/index.html";
                });
    
            } else {
                confirmRegPass.style.backgroundColor = '#fd9595';
            }
        }
    } 
    regBtn.addEventListener("click", register);
}

export default registration;
