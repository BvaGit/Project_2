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
        
    }
    #open (){
        this.session = this.#connection.session()
            console.log('connection to neo4j succesful')
    }
    #query(){
        this.session.query(query, func)
    }

    async getAllPersons(func){
        super.getAllPersons(func)
        const result = await this.session.run(`MATCH (n) RETURN n`)
        const answer = []
        result.records.forEach(function(record){
            record._fields[0].properties.phoneNumber = record._fields[0].properties.phoneNumber.low
            record._fields[0].properties.userID = record._fields[0].properties.userID.low
            record._fields[0].properties.age = record._fields[0].properties.age.low
            var person = record._fields[0].properties
            person.id = record._fields[0].identity.low
            answer.push(person)
        })
        func(null, answer)
    }

    async getPersonsByUserId(userID, func){
        super.getPersonsByUserId(func)
        const result = await this.session.run(`MATCH (n) WHERE n.userID = ${userID} RETURN n`)
        const answer = []
        result.records.forEach(function(record){
            record._fields[0].properties.phoneNumber = record._fields[0].properties.phoneNumber.low
            record._fields[0].properties.userID = record._fields[0].properties.userID.low
            record._fields[0].properties.age = record._fields[0].properties.age.low
            var person = record._fields[0].properties
            person.id = record._fields[0].identity.low
            answer.push(person)
        })
        func(null, answer)
    }

    async postPerson(person, func){
        super.postPerson(func)
        this.session.run(`CREATE (n:Person {firstName: '${person.fname}',lastName: '${person.lname}', age: '${person.age}', city: '${person.city}', phoneNumber: '${person.phoneNumber}', email: '${person.email}', companyName: '${person.companyName}', userID: '${person.user_id}'}) RETURN n`)
    }

    async deletePersonById (personId, func) {
        super.deletePersonById(personId, func)
        this.session.run(`MATCH (n:Person WHERE ID(n) = ${personId}}) DETACH DELETE n`, func)
    }

    async putPerson(person, func) {
        super.putPerson(person, func)
        this.session.run(`MATCH (n) WHERE ID(n) = ${person.id} SET n.firstName='${person.fname}', n.lastName='${person.lname}', n.age=${person.age}, n.city='${person.city}', n.phoneNumber='${person.phoneNumber}', n.email='${person.email}', n.companyName='${person.companyName}' RETURN n`, func)
    }
}

export { Neo4jConnector }