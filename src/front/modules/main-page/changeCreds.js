import {putRequest} from "../request"
const URL = "http://localhost:2020/api/";

export default function ChangeCreds(){
    const newLogin = document.getElementById("newLogin")
    const newPassword = document.getElementById("newPassword")
    const repeatPassword = document.getElementById("repeatPassword")
    var id = +localStorage.getItem("id_user")
    if(newPassword.value === repeatPassword.value){
        var body = {
            login: newLogin.value,
            password: newPassword.value,
        }
        putRequest(URL + "mysql/users/" + id, body).then(data=>{
            if(data.status === 201){
                console.log("всё четко");
            }else{
                console.log("не всё четко");
            }
        })
    }
}