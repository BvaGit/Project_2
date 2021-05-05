class User {
  constructor(id, login, password,deleted){
    super(id, deleted)
    this.login = login
    this.password = password
  }
}

export { User }