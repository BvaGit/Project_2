import putRequest from "../modules/request"
import changeCredsURL from "../constants/constants"
//повесть листенера на кнопку конфирм и вызывать эту функцию
// const settingsPopupConfirm = document.addEventListener("click", ChangeCreds)

function changeCreds(){
    const newLogin = document.getElementById("newLogin")
    const newPassword = document.getElementById("newPassword")
    const repeatPassword = document.getElementById("repeatPassword")
    //тут ещё провалидировать)
    if(true && newPassword.value === repeatPassword.value){
        var body = {
            login: newLogin.value,
            password: newPassword.value,
        }
        putRequest(changeCredsURL, body).then(data=>{
            if(data.status === 201){
                console.log("всё четко");
            }else{
                console.log("не всё четко");
            }
        })
    }
}
export default changeCreds