const baseURL = "http://localhost:2020/api"
const changeCreds = baseURL + "/mysql/users" + localStorage.getItem("id_user")

export default changeCreds