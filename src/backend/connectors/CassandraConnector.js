import cassandra from 'cassandra-driver';
import { BaseConnector }  from './BaseConnector.js'
import fs from 'fs'
import path from 'path'

class CassandraConnector extends BaseConnector {
  #connection
  
  constructor() {
    super();
    const __dirname = path.resolve()
    const connectionConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'connections.json')));
  
    this.tableName = 'Persons';
    this.config = connectionConfig.cassandra_connection;  
    this.#connection = new cassandra.Client({ 
        contactPoints: this.config.contactPoints,
        localDataCenter: this.config.localDataCenter
    });
    this.#open();
  }

  #open() {
    const createKsQuery = `CREATE KEYSPACE IF NOT EXISTS ${this.config.keyspace} WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 10 }`;
    const createPersonTableQuery = `CREATE TABLE IF NOT EXISTS
     ${this.tableName} (id UUID PRIMARY KEY, fname varchar, lname varchar, age int, city varchar, phoneNumber varchar, email text, companyName varchar, deleted smallint, user_id int);`;

    this.#connection
        .connect()
        .then(() => {
            this.#connection.execute(createKsQuery);
            this.#connection.execute(`USE ${this.config.keyspace}`);
            this.#connection.execute(createPersonTableQuery);
            console.log('Connection to Cassandra successfully opened');
        })
        .catch((err) => {
            console.log('Failed to connect to Cassandra', err.message);
        });
  }

  #query(query, callback, params) {
    this.#connection.execute(query, params, { prepare : true }, (err, result) => {
      let data = [];
      if (result && result.rows) {
        data = result.rows.map(row => {
          return {
            ...row,
            phoneNumber: row.phonenumber,
            companyName: row.companyname
          };
        });
      }

      if (typeof callback === 'function') {
        callback(err, data);
      }
    });
  }

  #close() {
    this.#connection.shutdown();
  }
  
  getAllPersons(func) {
    super.getAllPersons(func);
    this.#query(`SELECT * FROM ${this.tableName}`, func);
  }

  getPersons(func) {
    super.getPersons(func)
    this.#query(`SELECT * FROM ${this.tableName} WHERE deleted = 0 ALLOW FILTERING`, func)
  }

  getPersonsByUserId(user_id, func) {
    super.getPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND deleted = ? ALLOW FILTERING`, func, [ user_id, 0 ]);
  }

  deletePersonsByUserId(user_id, func) {
    super.getPersonsByUserId(user_id, func)
    this.#query(`UPDATE ${this.tableName} SET deleted = 1 WHERE user_id = ?`, func, [ user_id ]);
  }

  getDeletedPersonsByUserId(user_id, func) {
    super.getDeletedPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND deleted = ? ALLOW FILTERING`, func, [ user_id, 1 ]);
  }

  postPerson(person, func) {
    super.postPerson(person, func);
    const { fname, lname, age, city, phoneNumber, email, companyName, user_id } = person;
    const query = `INSERT INTO ${this.tableName} (id, fname, lname, age, city, phoneNumber, email, companyName, user_id, deleted) 
      VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    this.#query(
        query,
        func,
        [ fname, lname, age, city, phoneNumber, email, companyName, user_id, 0 ]
    );
  }

  deletePersonById(personId, func) {
    super.deletePersonById(personId, func);
    this.#query(`UPDATE ${this.tableName} SET deleted = 1 WHERE id = ?`, func, [ personId ]);
  }

  putPerson(person, func) {
    super.putPerson(person, func);
    const { id, fname, lname, age, city, phoneNumber, email, companyName, user_id } = person;
    const query = `UPDATE ${this.tableName} SET fname = ?, lname = ?, age = ?, city = ?, phoneNumber = ?, email = ?, companyName = ?, user_id = ? WHERE id = ?`;
    this.#query(query, func, [ fname, lname, age, city, phoneNumber, email, companyName, user_id, id ]);
  }
}
  
export { CassandraConnector }
