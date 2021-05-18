import mongoose from 'mongoose'
import { BaseConnector } from './BaseConnector.js'
import { JsonReader } from '../service/JsonReader.js'

class MongoDBConnector extends BaseConnector {
  #connection
  #PersonSchema
  #PersonModel

  constructor() {
    super()

    const connectionUrl = new JsonReader().read('connections.json').mongodb_connection.url
    this.#open(connectionUrl)
  }
  
  async #open(connectionUrl) {
    this.#connection = mongoose.createConnection(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, err => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to MongoDB successfully opened');
    })
  }
 }

 export { MongoDBConnector }