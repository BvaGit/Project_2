import sqlite3 from 'sqlite3'
import { BaseConnector } from './BaseConnector.js';

class SqliteConnector extends BaseConnector{
    #connection
    constructor(){
       super();
       this.#connection = sqlite3.verbose()
       this.#open();
    }

    #open() {
        this.#connection = new sqlite3.Database('sqliteDB/persons.db', function(err){
            if(err) console.log(err);
            console.log('connected to SQLIte');
          })
    }
    getAllPersons(func){
        super.getAllPersons(func);
        this.#connection.all('SELECT * FROM persons', func);
        
    }

    getPersonsByUserId(user_id, func) {
        super.getPersonsByUserId(user_id, func)
        this.#connection.all(`SELECT * FROM persons WHERE user_id =${user_id} AND deleted=0`, func)
      }

    getPersons(func){
      super.getPersons(func);
      this.#connection.all('SELECT * FROM persons WHERE deleted = 0', func);
    }

    postPerson(person, func) {
      super.postPerson(person, func);
      this.#connection.run(`INSERT INTO persons (fname, lname, age, city, phonenumber, email, companyname, user_id, deleted) VALUES ('${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', ${person.user_id}, FALSE)`, func);
      
    }

    deletePersonById (personId, func) {
        super.deletePersonById(personId, func)
        this.#connection.run(`UPDATE persons SET deleted=1 WHERE id=${personId}`, (err,rows) => {
            this.#connection.all(`SELECT * FROM persons WHERE id=${personId} AND deleted=0`, (err1,rows1) =>{
            if (rows1.length === 0) {
                func(new Error(), null)
            } else {
                func(null,rows)
            }
            })
        })
    }

    putPerson(person, func){
      super.putPerson(person, func);
      this.#connection.run(`UPDATE persons SET (fname, lname, age, city, phonenumber, email, companyname, user_id, deleted) = ('${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', ${person.user_id},'${person.deleted}') WHERE id=${person.id}`, func);
    }
    
    getDeletedPersonsByUserId(user_id, func) {
        super.getDeletedPersonsByUserId(user_id, func)
        this.#connection.run(`SELECT * FROM persons WHERE user_id =${user_id} AND deleted=1`, func)
    }
    
    putPersonBack (personId, func) {
      super.putPersonBack(personId, func)

        this.#connection.all(`SELECT * FROM persons WHERE id=${personId} AND deleted=1`, func)
    }

    deletePersonsByUserId (userId, func) {
      super.deletePersonsByUserId(userId, func)
 
        this.#connection.run(`UPDATE persons SET deleted=1 WHERE user_id=${userId}`, func)
    }
  
    putPersonsBackByUserId (userId, func) {
      super.putPersonsBackByUserId(userId, func)

        this.#connection.run(`UPDATE persons SET deleted=0 WHERE user_id=${userId}`, func)

    }
}

export { SqliteConnector };