import {putRequest} from "../request"
const URL = "http://3.133.161.246:80/api/";

export default function ChangeCreds(){
    const newLogin = document.getElementById("newLogin");
    const newPassword = document.getElementById("newPassword");
    const repeatPassword = document.getElementById("repeatPassword");
    const settingsSuccess = document.querySelector('.settingsSuccess')
    const settingsError = document.querySelector('.settingsError')
    var id = +localStorage.getItem("id_user");
    if(newPassword.value === repeatPassword.value){
        var body = {
            login: newLogin.value,
            password: newPassword.value,
        }
        putRequest(URL + "mysql/users/" + id, body).then(data=>{
            if(data.status === 201){
                resultMessageShow(settingsSuccess);
                setTimeout(()=> {
                    resultMessageHide(settingsSuccess);
                },2000) 
            }else{
                resultMessageShow(settingsError);
                setTimeout(()=> {
                    resultMessageHide(settingsError);
                },2000) 
            }
        })
    }
    function resultMessageShow (element) {
        element.classList.remove('hide');
    }
    function resultMessageHide (element) {
        element.classList.add('hide');
    }
}