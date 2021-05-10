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
    const createKsQuery = `CREATE KEYSPACE IF NOT EXISTS ${this.config.keyspace} WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 }`;
    const createPersonTableQuery = `CREATE TABLE IF NOT EXISTS
     ${this.tableName} (id UUID PRIMARY KEY, first_name varchar, last_name varchar, age int, city varchar, phone_number varchar, email text, company_name varchar, deleted boolean, user_id int);`;

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

  #query(query, cb, params) {
    this.#connection.execute(query, params, { prepare : true }, cb);
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
    this.#query(`SELECT * FROM ${this.tableName} WHERE deleted = false ALLOW FILTERING`, func)
  }

  getAllPersonsByUserId(user_id, func) {
    super.getAllPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND deleted = ? ALLOW FILTERING`, func, [ user_id, false ]);
  }

  getDeletedPersonsByUserId(user_id, func) {
    super.getAllPersonsByUserId(user_id, func)
    this.#query(`SELECT * FROM ${this.tableName} WHERE user_id = ? AND deleted = ? ALLOW FILTERING`, func, [ user_id, true ]);
  }

  postPerson(person, func) {
    super.postPerson(person, func);
    const { fname, lname, age, city, phoneNumber, email, companyName, user_id } = person;
    const query = `INSERT INTO ${this.tableName} (id, first_name, last_name, age, city, phone_number, email, company_name, user_id, deleted) 
      VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    this.#query(
        query,
        func,
        [ fname, lname, age, city, phoneNumber, email, companyName, user_id, false ]
    );
  }

  deletePersonById(personId, func) {
    super.deletePersonById(personId, func);
    this.#query(`UPDATE ${this.tableName} SET deleted = true WHERE id = ?`, func, [ personId ]);
  }

  putPerson(person, func) {
    super.putPerson(person, func);
    const { id, fname, lname, age, city, phoneNumber, email, companyName, user_id } = person;
    const query = `UPDATE ${this.tableName} SET first_name = ?, last_name = ?, age = ?, city = ?, phone_number = ?, email = ?, company_name = ?, user_id = ? WHERE id = ?`;
    this.#query(query, func, [ fname, lname, age, city, phoneNumber, email, companyName, user_id, id ]);
  }
}
  
export { CassandraConnector }