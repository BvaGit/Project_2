import pg from 'pg';
import { BaseConnector } from './BaseConnector.js';
import { JsonReader } from '../service/JsonReader.js';

class PgConnect extends BaseConnector{
    #connection
    constructor(){
       super();

       
       const connections = new JsonReader().read('connections.json').pg_connect;
       this.#connection = new pg.Pool({
         ...connections
       });
       this.#open();
    }

    #open() {
      this.#connection.connect(err =>{
        if (err) {
          return console.error(`Error: ${err.message}`)
        }
        console.log('Connection to PostgreSQL successfully opened');
      });
    }

    #query(query, func) {
      this.#connection.query(query, (err, result) => {
        if (result && result.rows) {
          result = result.rows;
          for ( const row of result){
            if (row.phonenumber){
              row.phoneNumber = row.phonenumber
              delete row.phonenumber
            }
            if (row.companyname){
              row.companyName = row.companyname
              delete row.companyname
            }
          }

        }
        if (func){
          func (err, result)
        }
      })
    }
  
    getAllPersons(func) {
      super.getAllPersons()
      this.#query('SELECT * FROM persons', func)
    }
  
    getPersons(func) {
      super.getPersons()
      this.#query('SELECT * FROM persons WHERE deleted=0', func)
    }
  
    getPersonsByUserId(userId, func) {
      super.getPersonsByUserId(userId)
      this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=0`, func)
    }
  
    getDeletedPersonsByUserId(userId, func) {
      super.getDeletedPersonsByUserId(userId)
      this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=1`, func)
    }
  
    postPerson(person, func) {
      super.postPerson(person)
      this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.user_id}', 0)`, func)
    }
  
    putPerson(person, func) {
      super.putPerson(person)
      this.#query(`UPDATE persons SET fname='${person.fname}', lname='${person.lname}', age=${person.age}, city='${person.city}', phoneNumber='${person.phoneNumber}', email='${person.email}', companyName='${person.companyName}' WHERE id=${person.id}`, func)
    }
  
    deletePersonById(personId, func) {
      super.deletePersonById(personId)
      this.#query(`UPDATE persons SET deleted=1 WHERE id=${personId}`, func)
    }
    // putPersonBack(personId, func) {
    //   super.putPersonBack(personId)
    //   this.#query(`UPDATE persons SET deleted=0 WHERE id=${personId}`, func)
    // }

    putPersonBack (personId, func) {
      super.putPersonBack(personId, func)
  
      this.#query(`UPDATE persons SET deleted=0 WHERE id=${personId}`, (err,rows) => {
        this.#query(`SELECT * FROM persons WHERE id=${personId} AND deleted=1`, (err1,rows1) =>{
          if (rows1.length === 0) {
            func(new Error(), null)
          } else {
            func(null,rows)
          }
        })
      })
    }

    deletePersonsByUserId (userId, func) {
      super.deletePersonsByUserId(userId, func)
  
      this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=0`, (err,rows) => {
        this.#query(`UPDATE persons SET deleted=1 WHERE user_id=${userId}`, (err1,rows1) =>{
          if (rows.length === 0) {
            func(new Error(), null)
          } else {
            func(null,rows1)
          }
        })
      })
    }
  
    putPersonsBackByUserId (userId, func) {
      super.putPersonsBackByUserId(userId, func)
  
      this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=1`, (err,rows) => {
        this.#query(`UPDATE persons SET deleted=0 WHERE user_id=${userId}`, (err1,rows1) =>{
          if (rows.length === 0) {
            func(new Error(), null)
          } else {
            func(null,rows1)
          }
        })
      })
    }

  }

export { PgConnect };