import express, { Router } from 'express'
import { logger } from './middleware/logger.js'
import { ServerOptions } from './service/ServerOptions.js'
import { MySQLConnector } from './connectors/MySQLConnector.js'
import { RedisConnector } from './connectors/RedisConnector.js'
import { MongoDBConnector } from './connectors/MongoDBConnector.js'
import { JwtService } from './service/JwtService.js'
import cors from 'cors'

class Server {
  #app
  #router
  

  constructor() {
  
    this.#app = express()
    this.#router = Router()
    
    
    
    const mySqlConnector = new MySQLConnector()
    const redisConnector = new RedisConnector()
    const mongoDbConnector = new MongoDBConnector()

    this.#enableMySQLUsers(mySqlConnector)
    
    this.#enableConnector(mySqlConnector, 'mysql')
    this.#enableConnector(redisConnector,'redis')
    this.#enableConnector(mongoDbConnector, 'mongodb')
    
  }

  serve(func) {
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
        res.status(200).json(rows)
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
        res.status(200).json(rows)
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
        res.status(200).json(rows)
      })
    })

    this.addRoute(new ServerOptions('POST', `${dbms}/persons`), (req, res) => {
      const body = req.body;
      if (typeof body.fname === 'string'
          && typeof body.lname === 'string'
          && typeof body.age === 'number' && body.age % 1 === 0 && body.age > 0
          && typeof body.city === 'string'
          && typeof body.phoneNumber === 'string'
          && typeof body.email === 'string'
          && typeof body.companyName === 'string'
          && typeof body.user_id === 'number' && body.user_id > 0) {
        connector.postPerson(body)
        res.status(201).json({message:'person creation is succeeded'})
        return
      }
      res.status(400).json({message:'person creation failed'})
    })
    
    this.addRoute(new ServerOptions('PUT', `${dbms}/persons/:id`), (req, res) => {
      const body = req.body;
      if (typeof body.fname === 'string'
          && typeof body.lname === 'string'
          && typeof body.age === 'number' && body.age % 1 === 0 && body.age > 0
          && typeof body.city === 'string'
          && typeof body.phoneNumber === 'string'
          && typeof body.email === 'string'
          && typeof body.companyName === 'string') {
        connector.putPerson({id: req.params.id, ...body})
        res.status(200).json({message:'person update is succeeded'})
        return
      }
      res.status(400).json({message:'person update failed'})
    })

    this.addRoute(new ServerOptions('GET', `${dbms}/persons/:id`), (req, res) => {
      connector.deletePersonById(req.params.id, err => {
        if (err) {
          return console.error(`Error:${err.message}`)
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
        res.status(200).json(persons)
      })
    })
  }

  #enableMySQLUsers(connection) {
    this.addRoute(new ServerOptions('GET', 'mysql/users'), (req, res) => {
      connection.getUsers((err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`);
        }
        res.status(200).json(rows)
      })
    })

    this.addRoute(new ServerOptions('GET','mysql/users/all'), (req, res) => {
      connection.getAllUsers((err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`);
        }
        res.status(200).json(rows)
      })
    })

    this.addRoute(new ServerOptions('POST','mysql/users'), (req, res) => {
      const body = req.body
      if (typeof body.login === 'string' && typeof body.password === 'string') {
        connection.postUser(body)
        res.status(201).json({message:'user creation succeeded'})
        return
      }
      res.status(400).json({message:'user creation failed'})
    })
    
    this.addRoute(new ServerOptions('PUT','mysql/users/:id'), (req, res) => {
      const body = req.body
      if (typeof body.login === 'string' && typeof body.password === 'string') {
        connection.putUser({id:req.params.id, ...body})
        res.status(200).json({message:'user update is succeeded'})
        return
      }
      res.status(400).json({message:'user update failed'})
    })

    this.addRoute(new ServerOptions('DELETE','mysql/users/:id'), (req, res) => {
      connection.deleteUserById(req.params.id,(err,row) =>{
        if (err) {
          return console.error(`Error:${err.message}`)
        }
        res.status(200).json({message:`user with id: ${req.params.id} successfully deleted`})
      })
    })
    
    this.addRoute(new ServerOptions('POST','mysql/auth'), (req, res) => {
      const body = req.body
      if (typeof body.login === 'string' && typeof body.password === 'string') {
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