const baseURL = "http://localhost:2020/api"
const changeCredsURL = baseURL + "/mysql/users" + localStorage.getItem("id_user")

export default changeCredsURL