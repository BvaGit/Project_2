import mysql  from 'mysql'
import { BaseConnector }  from './BaseConnector.js'
import fs from 'fs'
import path from 'path'

class MySQLConnector extends BaseConnector{
  #connection
  
  constructor(){
    super()

    const __dirname = path.resolve()
    const connections = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'connections.json')))
    this.#connection = mysql.createConnection({
      ...connections.mysql_connection
    })
    this.#open()
  }

  #open() {
    this.#connection.connect(err =>{
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to MySQL successfully opened');
    })
  }

  #query(query, func) {
    this.#connection.query(query, func)
  }

  #close() {
    this.#connection.end(err => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to MySQL successfully closed');
    })
  }
  
  getAllPersons(func) {
    super.getAllPersons(func)
    this.#query('SELECT * FROM persons', func)
  }

  getPersons(func) {
    super.getPersons(func)
    this.#query('SELECT * FROM persons WHERE deleted = 0', func)
  }

  getUsers(func) {
    this.#query('SELECT * FROM users WHERE deleted = 0', func)
  }

  getAllUsers(func) {
    this.#query('SELECT * FROM users', func)
  }
  
  getAllPersonsByUserId(user_id, func) {
    super.getAllPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM persons WHERE user_id =${user_id} AND deleted=0`, func)
  }

  getDeletedPersonsByUserId(user_id, func) {
    super.getAllPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM persons WHERE user_id =${user_id} AND deleted=1`, func)
  }

  postPerson(person, func) {
    super.postPerson(person, func)
    this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', ${person.user_id}, FALSE)`, func)
  }

  postUser(user, func) {
    this.#query(`INSERT INTO users VALUES (DEFAULT, '${user.login}', '${user.password}', FALSE)`, func)
  }

  deletePersonById (personId, func) {
    super.deletePersonById(personId, func)
    this.#query(`UPDATE persons SET deleted=1 WHERE id=${personId}`, func)
  }

  deleteUserById (userId, func) {
    this.#query(`UPDATE persons SET deleted=1 WHERE user_id=${userId}`, () => {})
    this.#query(`UPDATE users SET deleted=1 WHERE id=${userId}`, func)
  }


  putPerson(person, func) {
    super.putPerson(person, func)
    this.#query(`UPDATE persons SET fname='${person.fname}', lname='${person.lname}', age=${person.age}, city='${person.city}', phoneNumber='${person.phoneNumber}', email='${person.email}', companyName='${person.companyName}' WHERE id=${person.id}`, func)
  }

  putUser(user, func) {
    this.#query(`UPDATE users SET login='${user.login}', password='${user.password}' WHERE id=${user.id}`, func)
  }
}
  
export { MySQLConnector }