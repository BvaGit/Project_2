import {postRequest, getRequest } from '../modules/request';
import valid from "./valid";
const url1 = "http://3.133.161.246:80/api/";
const url2 = "http://18.217.70.70:2020/api/";
const localUrl = "http://localhost:2020/api/";

function registration(){
    const url = `${localUrl}mysql/users`;
    const regLogin = document.querySelector("#reglogin");
    const regPass = document.querySelector("#regpass");
    const confirmRegPass = document.querySelector("#confirmregpass");
    const regBtn = document.querySelector(".reg__btn");


    function register (){
        regLogin.style.backgroundColor = '#fff';
        regPass.style.backgroundColor = '#fff';
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
        } else {
            regLogin.value = "";
            regPass.value = "";
            regLogin.style.backgroundColor = '#fd9595';
            regPass.style.backgroundColor = '#fd9595';
        }
    } 

    regBtn.addEventListener("click", register);
}
export default registration;
