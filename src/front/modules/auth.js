import {postRequest, getRequest } from '../modules/request';


function authorization(){
    const url = "http://localhost:2020/api/mysql/auth";
    const authlogin = document.querySelector("#authlogin");
    const authpass = document.querySelector("#authpass");
    const autBtn = document.querySelector(".auth__btn");

    autBtn.addEventListener("click", ()=>{
        const auth = {
            login: authlogin.value,
            password: authpass.value
        };

        postRequest(url, auth).then(async (data) => {
            
            const token = await (data.json());

            localStorage.setItem('id_user', token.id);
            document.cookie = `token=${token.token}; path=/; max-age=60*60*2`;

            if(data.ok){
                document.location.href = "/main.html";
            } else {
                document.location.href = "/regpage.html";
            }
            

        });
    });


}

export default authorization;