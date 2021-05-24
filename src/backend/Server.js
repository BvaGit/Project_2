import express, { Router } from 'express'
import cors from 'cors';

import { Person } from './models/person/Person.js'
import { User } from './models/user/User.js'

import { logger } from './middleware/logger.js'
import { JwtService } from './service/JwtService.js'
import { ServerValidator } from './service/ServerValidator.js'
import { ServerOptions } from './service/ServerOptions.js'

import { MySQLConnector } from './connectors/MySQLConnector.js'
import { PgConnect } from './connectors/PostgreSQLConnector.js';
import { RedisConnector } from './connectors/RedisConnector.js'
import { MongoDBConnector } from './connectors/MongoDBConnector.js'
import { CassandraConnector } from './connectors/CassandraConnector.js'




class Server {
  #app
  #router
  

  constructor() {
  
    this.#app = express()
    this.#router = Router()
         
    const mySqlConnector = new MySQLConnector()
    const redisConnector = new RedisConnector()
    // const mongoDbConnector = new MongoDBConnector()

    

    //const cassandraConnector = new CassandraConnector();
    const pgConnect = new PgConnect();
    
    this.#enableMySQLUsers(mySqlConnector)
    this.#enableConnector(pgConnect, 'pg');
    this.#enableConnector(mySqlConnector, 'mysql')
    this.#enableConnector(redisConnector,'redis')
    // this.#enableConnector(mongoDbConnector, 'mongodb')
    // this.#enableConnector(cassandraConnector, 'cassandra')
  }

  serve(func) {
    this.#app.use(cors());
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(cors())
    this.#app.use(logger)  
    this.#app.use(JwtService.authenticateToken)
  
    this.#app.use(this.#router)
    
    this.#app.listen(process.env.PORT, func)
  }

  addRoute(options, func) {
    switch (options.method) {
      case 'GET':
        this.#router.get(`/api/${options.url}`, func)
      break
      case 'POST':
        this.#router.post(`/api/${options.url}`, func)
      break
      case 'PUT':
        this.#router.put(`/api/${options.url}`, func)
      break
      case 'DELETE':
        this.#router.delete(`/api/${options.url}`, func)
      break
    }
  }

  #enableConnector(connector, dbms) {
    this.addRoute(new ServerOptions('GET', `${dbms}/persons`), (req, res) => {
      connector.getPersons((err, rows) => {
        if (err){
          return console.error(`Error: ${err.message}`);
        }
        if (rows.hasOwnProperty('rows')) {
          rows = rows.rows;
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new ServerOptions('GET', `${dbms}/persons/all`), (req, res) => {
      connector.getAllPersons((err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`);
        }
        if (rows.hasOwnProperty('rows')) {
          rows = rows.rows;
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new ServerOptions('GET', `${dbms}/persons/:id`), (req, res) => {
      connector.getPersonsByUserId(req.params.id, (err, rows) => {
        if (err) {
          return console.error(`Error:${err.message}`)
        }
        if (rows.hasOwnProperty('rows')) {
          rows = rows.rows;
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new ServerOptions('POST', `${dbms}/persons`), (req, res) => {
      const body = req.body;

      if (ServerValidator.validateStr(body.fname, ServerValidator.namePattern)
          && ServerValidator.validateStr(body.lname, ServerValidator.namePattern)
          && ServerValidator.validateNumber(body.age, n => n > 0 && n <= 123 && n % 1 === 0)
          && typeof body.city === 'string'
          && ServerValidator.validateStr(body.phoneNumber, ServerValidator.phonePattern)
          && ServerValidator.validateStr(body.email, ServerValidator.emailPattern)
          && typeof body.companyName === 'string'
          && ServerValidator.validateNumber(body.user_id, n => n > 0 && n % 1 === 0)) {
        connector.postPerson(body)
        res.status(201).json({message:'person creation is succeeded'})
        return
      }
      res.status(400).json({message:'person creation failed'})
    })
    
    this.addRoute(new ServerOptions('PUT', `${dbms}/persons/:id`), (req, res) => {
      const body = req.body;
      if (ServerValidator.validateStr(body.fname, ServerValidator.namePattern)
          && ServerValidator.validateStr(body.lname, ServerValidator.namePattern)
          && ServerValidator.validateNumber(body.age, n => n > 0 && n <= 123 && n % 1 === 0)
          && typeof body.city === 'string'
          && ServerValidator.validateStr(body.phoneNumber, ServerValidator.phonePattern)
          && ServerValidator.validateStr(body.email, ServerValidator.emailPattern)
          && typeof body.companyName === 'string'
          && ServerValidator.validateNumber(body.user_id, n => n > 0 && n % 1 === 0)) {
        connector.putPerson({id: req.params.id, ...body})
        res.status(200).json({message:'person update is succeeded'})
        return
      }
      res.status(400).json({message:'person update failed'})
    })

    this.addRoute(new ServerOptions('DELETE', `${dbms}/persons/:id`), (req, res) => {

      connector.deletePersonById(req.params.id, err => {
        if (err) {
          return res.status(400).json({message:`person with id: ${req.params.id} does not exists`})
        }
        res.status(200).json({message:`person with id: ${req.params.id} successfully deleted`})
      })
    })

    this.addRoute(new ServerOptions('GET',`${dbms}/persons/:id/deleted`), (req, res) => {
      connector.getDeletedPersonsByUserId(Number(req.params.id),(err, rows) =>{
        if (err) {
          return console.error(`Error: ${err.message}`)
        }
        if (rows.hasOwnProperty('rows')){
          rows = rows.rows
        }
        res.status(200).json(rows)
      })
    })
  }

  #enableMySQLUsers(connection) {
    this.addRoute(new ServerOptions('GET', 'mysql/users'), (req, res) => {
      connection.getUsers((err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`);
        }
        const users = rows.map(row => new User(row.id, row.login, row.password, row.deleted))
        res.status(200).json(users)
      })
    })

    this.addRoute(new ServerOptions('GET','mysql/users/all'), (req, res) => {
      connection.getAllUsers((err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`);
        }
        const users = rows.map(row => new User(row.id, row.login, row.password, row.deleted))
        res.status(200).json(users)
      })
    })

    this.addRoute(new ServerOptions('POST','mysql/users'), (req, res) => {
      const body = req.body
      connection.getUserByLogin(body,(err,rows) => {
        if (rows.length > 0) {
          return res.status(400).json({message:'user is already exists'})
        } 
        if (ServerValidator.validateStr(body.login, ServerValidator.regAuthPattern) 
          && ServerValidator.validateStr(body.password, ServerValidator.regAuthPattern)) {
          connection.postUser(body)
          res.status(201).json({message:'user creation succeeded'})
          return
        }
        res.status(400).json({message:'user creation failed'})
      })
    })
    
    this.addRoute(new ServerOptions('PUT','mysql/users/:id'), (req, res) => {
      const body = req.body
      connection.getUserByLogin(body,(err,rows) => {
        if (rows.length > 0) {
          return res.status(400).json({message:'login is already exists'})
        } 
        if (ServerValidator.validateStr(body.login, ServerValidator.regAuthPattern) 
          && ServerValidator.validateStr(body.password, ServerValidator.regAuthPattern)) {
          connection.putUser({id:req.params.id, ...body})
          res.status(201).json({message:'user update is succeeded'})
          return
        }
        res.status(400).json({message:'user update failed'})
      })
    })

    this.addRoute(new ServerOptions('DELETE','mysql/users/:id'), (req, res) => {
      connection.deleteUserById(req.params.id,(err,row) =>{
        if (err) {
          return  res.status(400).json({message:`user with id: ${req.params.id} does not exists`})
        }
        res.status(200).json({message:`user with id: ${req.params.id} successfully deleted`})
      })
    })
    
   
    this.addRoute(new ServerOptions('POST','mysql/auth'), (req, res) => {
      const body = req.body
      if (ServerValidator.validateStr(body.login, ServerValidator.regAuthPattern) 
      && ServerValidator.validateStr(body.password, ServerValidator.regAuthPattern)) {
        connection.getUserByLoginAndPassword(body, (err, rows) => {
          if (err) {
            return console.error(`Error: ${err.message}`)
          }
          if (rows.length > 0) {
            const userLogin = rows[0].login
            const token = JwtService.generateAccessToken({login: userLogin})
            res.status(200).json({id: rows[0].id, token})
          } else {
            res.status(401).json({message: "Unauthorized"})
          }
        })
      }
    })
  }
}

export { Server }