import neo4j from "neo4j-driver"
import { BaseConnector }  from './BaseConnector.js'
import { JsonReader } from '../service/JsonReader.js'
import { query } from "express"

class Neo4jConnector extends BaseConnector{
    #connection

    constructor(){
        super()

        const connection = new JsonReader().read('connections.json').neo4j_connection
        
        this.#connection = neo4j.driver(connection.url, neo4j.auth.basic(connection.user, connection.password))
        this.#open()
        this.session = this.#connection.session()
    }
    #open (){
        console.log("connection to neo7j succesfull");
    }
    // #query(){
    //     this.session.run(func)
    // }

    getAllPersons(func){
        super.getAllPersons(func)
        this.session.run("MATCH (n) RETURN n")
    }

    getPersonsByUserId(userID, func){
        super.getPersonsByUserId(func)
        this.session.run(`MATCH (n) WHERE n.userID = ${userID} RETURN n`)
    }

    postPerson(person, func){
        super.postPerson(func)
        this.session.run(`CREATE (n:Person {firstName: '${person.fname}',lastName: '${person.lname}', age: '${person.age}', city: '${person.city}', phoneNumber: '${person.phoneNumber}', email: '${person.email}', companyName: '${person.companyName}', userID: '${person.user_id}'})`)
    }

    deletePersonById (personId, func) {
        super.deletePersonById(personId, func)
        this.session.run(`MATCH (n:Person WHERE ID(n) = ${personId}}) DETACH DELETE n`, func)
    }

    putPerson(person, func) {
        super.putPerson(person, func)
        this.session.run(`MATCH (n) WHERE ID(n) = ${person.id} SET n.firstName='${person.fname}', n.lastName='${person.lname}', n.age=${person.age}, n.city='${person.city}', n.phoneNumber='${person.phoneNumber}', n.email='${person.email}', n.companyName='${person.companyName}'`, func)
    }
}

export { Neo4jConnector }