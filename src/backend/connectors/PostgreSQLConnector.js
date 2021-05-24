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
        this.#connection.query(query, func)
      }

    getAllPersons(func){
        super.getAllPersons(func);
        this.#query('SELECT * FROM persons', func);
        
    }

    getPersons(func){
      super.getPersons(func);
      this.#query('SELECT * FROM persons WHERE deleted = 0', func);
    }

    postPerson(person, func) {
      super.postPerson(person, func);
      this.#query(`INSERT INTO persons (fname, lname, age, city, phonenumber, email, companyname, user_id, deleted) VALUES ('${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.user_id}', FALSE)`, func);
      
    }

    deletePersonById (personId, func) {
      super.deletePersonById(personId, func);
      this.#query(`DELETE FROM persons WHERE id=${personId}`, func);
    }

    putPerson(person, func){
      super.putPerson(person, func);
      this.#query(`UPDATE persons SET (fname, lname, age, city, phonenumber, email, companyname, user_id, deleted) = ('${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.user_id}', FALSE) WHERE id=${person.id}`, func);
    }

    
}

export { PgConnect };