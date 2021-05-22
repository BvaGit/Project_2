import neo4j from "neo4j-driver"
import { BaseConnector }  from './BaseConnector.js'
import { JsonReader } from '../service/JsonReader.js'

class Neo4jConnector extends BaseConnector{
    #connection

    constructor(){
        super()
        this.#open()
    }
    
    #open (){
        const connection = new JsonReader().read('connections.json').neo4j_connection
        this.#connection = neo4j.driver(connection.url, neo4j.auth.basic  (connection.user, connection.password))
        if(this.#connection){
            console.log("connected to neo4j");
        }
    }
    #query(query, func){
        const session  = this.#connection.session()
        session.run(query).then(result=>{
            if(result.records[0]){
                var persons = []
                result.records.forEach(function(record){
                    record._fields[0].properties.phoneNumber = record._fields[0].properties.phoneNumber.low
                    record._fields[0].properties.user_id = record._fields[0].properties.user_id.low
                    record._fields[0].properties.age = record._fields[0].properties.age.low
                    record._fields[0].properties.deleted = record._fields[0].properties.deleted.low
                    var person = record._fields[0].properties
                    person.id = record._fields[0].identity.low
                    persons.push(person)
                })
                func(null, persons)
            }else{
                func(null, [])
            }
        }).catch(err=>func(err, null)).then(()=>{
            session.close()
        })
    }

    getAllPersons(func){
        this.#query(`MATCH (n) RETURN n`, func)
    }

    getPersons(func){
        super.getPersons(func);
        this.#query(`MATCH (n) WHERE n.deleted = 0 RETURN n`, func);
      }

    getPersonsByUserId(user_id, func){
        super.getPersonsByUserId(func)
        this.#query(`MATCH (n) WHERE n.user_id = ${user_id} AND n.deleted = 0 RETURN n`, func)
    }

    postPerson(person){
        super.postPerson()
        this.#query(`CREATE (n:Person {fname: '${person.fname}',lname: '${person.lname}', age: ${person.age}, city: '${person.city}', phoneNumber: '${person.phoneNumber}', email: '${person.email}', companyName: '${person.companyName}', user_id: ${person.user_id}, deleted: 0})`, ()=>{})
    }

    deletePersonById (personId, func) {
        super.deletePersonById(personId)
        // this.#query(`MATCH (n) WHERE id(n) = ${personId} SET n.deleted = 1`, (err, persons)=>{
        //     this.#query(`MATCH (n) WHERE id(n) = ${personId} AND n.deleted = 0 RETURN n`, (err1, persons1)=>{
        //         if(persons1.length === 0){
        //             func(new Error(), null)
        //         } else {
        //             func(null, persons)
        //         }
        //     })
        // })
        this.#query(`MATCH (n) WHERE id(n) = ${personId} SET n.deleted = 1`, func)
    }

    putPerson(person) {
        super.putPerson(person)
        this.#query(`MATCH (n) WHERE ID(n) = ${person.id} SET n.fname='${person.fname}', n.lname='${person.lname}', n.age=${person.age}, n.city='${person.city}', n.phoneNumber='${person.phoneNumber}', n.email='${person.email}', n.companyName='${person.companyName}'`, ()=>{})
    }

    getDeletedPersonsByUserId(user_id, func) {
        super.getDeletedPersonsByUserId(user_id, func)
        this.#query(`MATCH (n) WHERE n.user_id = ${user_id} AND n.deleted = 1 RETURN n`, func)
      }
}

export { Neo4jConnector }