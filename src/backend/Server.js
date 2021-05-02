import express, { Router } from 'express'
import { logger } from './middleware/logger.js'
import { ServerOptions } from './service/ServerOptions.js'
import { MySQLConnector } from './connectors/MySQLConnector.js'

class Server {
  #app
  #PORT
  #router

  constructor(PORT) {
    this.#PORT = PORT || 8080
    this.#app = express()
    this.#router = Router()

    const mySqlConnector = new MySQLConnector()
    this.#enableMySQLUsers(mySqlConnector)
    this.#enableSQL(mySqlConnector, 'mysql')
  }

  serve(func) {
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(logger)    
    this.#app.use(this.#router)

    this.#app.listen(this.#PORT, func)
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

  #enableSQL(connection, dbms) {
    this.addRoute(new ServerOptions('GET', `${dbms}/persons`), (req, res) => {
      connection.getPersons((err, rows) => {
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
      connection.getAllPersons((err, rows) => {
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
      connection.getAllPersonsByUserId(req.params.id, (err, rows) =>{
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
        connection.postPerson(body)
        res.status(201).send('person creation is succeeded')
        return
      }
      res.status(400).send('person creation failed')
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
        connection.putPerson({id: req.params.id, ...body})
        res.status(200).send('person update is succeeded')
        return
      }
      res.status(400).send('person update failed')
    })

    this.addRoute(new ServerOptions('DELETE', `${dbms}/persons/:id`), (req, res) => {
      connection.deletePersonById(req.params.id, err => {
        if (err) {
          return console.error(`Error:${err.message}`)
        }
        res.status(200).send(`person with id: ${req.params.id} successfully deleted`)
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
        res.status(201).send('user creation is succeeded')
        return
      }
      res.status(400).send('user creation failed')
    })
    
    this.addRoute(new ServerOptions('PUT','mysql/users/:id'), (req, res) => {
      const body = req.body
      if (typeof body.login === 'string' && typeof body.password === 'string') {
        connection.putUser({id:req.params.id, ...body})
        res.status(200).send('user update is succeeded')
        return
      }
      res.status(400).send('user update failed')
    })

    this.addRoute(new ServerOptions('DELETE','mysql/users/:id'), (req, res) => {
      connection.deleteUserById(req.params.id,(err,row) =>{
        if (err) {
          return console.error(`Error:${err.message}`)
        }
        res.status(200).send(`user with id: ${req.params.id} successfully deleted`)
      })
    })
  }
}

export { Server }