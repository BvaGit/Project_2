import { BaseModel } from "../BaseModel.js"

class User extends BaseModel {
  constructor(id, login, password,deleted){

    super(id, deleted)

    this.login = login
    this.password = password
  }
}

export { User }