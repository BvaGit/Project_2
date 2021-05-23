import putRequest from "../modules/request"
import changeCreds from "../constants/constants"
//повесть листенера на кнопку конфирм и вызывать эту функцию
// const settingsPopupConfirm = document.addEventListener("click", ChangeCreds)

function ChangeCreds(){
    const newLogin = document.getElementById("newLogin")
    const newPassword = document.getElementById("newPassword")
    const repeatPassword = document.getElementById("repeatPassword")
    //тут ещё провалидировать)
    if(true && newPassword.value === repeatPassword.value){
        var body = {
            login: newLogin.value,
            password: newPassword.value,
        }
        putRequest(changeCreds, body).then(data=>{
            if(data.status === 201){
                console.log("всё четко");
            }else{
                console.log("не всё четко");
            }
        })
    }
}
export default ChangeCreds