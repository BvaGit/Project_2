import {putRequest} from "../request"
import valid from "../valid";
const url1 = "http://3.133.161.246:80/api/";
const url2 = "http://18.217.70.70:2020/api/";
const localUrl = "http://localhost:2020/api/";

const URL = url1;

export default function ChangeCreds(){
    const newLogin = document.getElementById("newLogin");
    const newPassword = document.getElementById("newPassword");
    const repeatPassword = document.getElementById("repeatPassword");
    const settingsSuccess = document.querySelector('.settingsSuccess')
    const settingsError = document.querySelector('.settingsError')
    var id = +localStorage.getItem("id_user");
    if((newPassword.value === repeatPassword.value) && (valid(newLogin.value, newPassword.value))){
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
    } else {
        resultMessageShow(settingsError);
        setTimeout(()=> {
            resultMessageHide(settingsError);
        },2000) 
    }
    function resultMessageShow (element) {
        element.classList.remove('hide');
    }
    function resultMessageHide (element) {
        element.classList.add('hide');
    }
}
