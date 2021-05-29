import {postRequest, getRequest } from '../modules/request';


function authorization(){
    const url = "http://3.133.161.246:80/api/mysql/auth";
    const authlogin = document.querySelector("#authlogin");
    const authpass = document.querySelector("#authpass");
    const autBtn = document.querySelector(".auth__btn");

    function authPassInputError(){
        authpass.value = "";
        authpass.style.backgroundColor = "#fd9595";
        authpass.placeholder = "Incorrect password";
    }

    function postAuthorization(obj){
        postRequest(url, obj).then(async (data) => {
            if(data.ok){
                const token = await (data.json());
                localStorage.setItem('id_user', token.id);
                document.cookie = `token=${token.token}; path=/; max-age=7200`;
                document.location.href = "/main.html";
            }else if(data.status === 400){
                authPassInputError();
            } else {
                document.location.href = "/regpage.html";
            }
        });
    }

    autBtn.addEventListener("click", ()=>{
        const auth = {
            login: authlogin.value,
            password: authpass.value
        };
       
        if(auth.login.length >= 5 && auth.password.length >= 5){
            postAuthorization(auth);
        } else if (auth.password.length < 5){
            authPassInputError();
        } 

    });


}

export default authorization;