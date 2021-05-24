import { BaseConnector } from './BaseConnector.js'
import redis from 'async-redis'
import { JsonReader } from '../service/JsonReader.js'

const TABLE = 'persons'

class RedisConnector extends BaseConnector {
  #client

  constructor(){
    super()
    const connection = new JsonReader().read('connections.json').redis_connection
    this.#client = redis.createClient(connection)
    this.#client.on('ready', err => {
      if (err) {
        return console.error(`Error: ${err}`);
      }
      console.log('Connection to Redis successfully opened');
    })
  }
  async getAllPersons(func) {
    super.getPersons()

    try {
      const reply = await this.#client.zrange(TABLE, 0, -1)
      if (reply.length === 0) {
        throw new Error()
      }
      func(null, reply.map(JSON.parse))
    } catch (e) {
      func(e)
    }
  }

  async getPersons(func) {
  
    super.getPersons() 
    try {
    const reply = await this.#client.zrange(TABLE, 0, -1)
  
    func(null, reply.map(JSON.parse).filter(person => person.deleted === 0))
    } catch (e) {
      func(e)
    }
  }

  async getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId)
    try {
    const reply = await this.#client.zrange(TABLE, 0, -1)
  
    func(null, reply.map(JSON.parse).filter(person => person.user_id === userId && person.deleted === 0))
    } catch (e) {
      func(e)
    }
  }

  async postPerson(person, funс) {
    super.postPerson(person)
    try {
      const count = await this.#client.zcount(TABLE,'-inf', '+inf')

      if (person.hasOwnProperty('id')) {
      delete person.id 
      }
      const dbPerson = Object.assign({id: count + 1, deleted: 0}, person)
    
      await this.#client.zadd(TABLE, count + 1, JSON.stringify(dbPerson))
    } catch (e) {
      func (e)
    }
  }
  
  async putPerson(person, func) {
    super.putPerson(person)
    try {
      let dbPerson = Object.assign({deleted: 0}, person)
      await this.#client.zremrangebyscore(TABLE, `${person.id}`,`${person.id}`)
      await this.#client.zadd(TABLE, person.id, JSON.stringify(dbPerson))
      func(null)
    } catch (e) {
      func(e)
    }
  }

  async deletePersonById(personId, func) {
    super.deletePersonById(personId)
    try {
      const reply = await this.#client.zrangebyscore(TABLE, `${personId}`, `${personId}`)
      if (reply.length === 0) {
        throw new Error()
      }
      const dbPerson = JSON.parse(reply[0])
      dbPerson.deleted = 1
      await this.#client.zremrangebyscore(TABLE, `${personId}`, `${personId}`)
      await this.#client.zadd(TABLE, personId, JSON.stringify(dbPerson))
      func(null)
    } catch (e) {
      func(e)
    }
  }

  async getDeletedPersonsByUserId(userId, func) { 
    super.getDeletedPersonsByUserId(userId)

    try {
      const reply = await this.#client.zrange(TABLE, 0, -1)
      if (reply.length === 0) {
        throw new Error()
      }
      func(null, reply.map(JSON.parse).filter(person => person.user_id === userId && person.deleted !== 0))
    } catch (e) {
      func(e)
    }

  };

  async deletePersonsByUserId(userId, func) {
    super.deletePersonsByUserId(userId)
    const reply = await this.#client.zrangebyscore(TABLE, `${person.id}`, `${person.id}`)
    const dbPerson = JSON.parse(reply[0])
    dbPerson.deleted = 1
    await this.#client.zremrangebyscore(TABLE, `${person.id}`, `${person.id}`)
    await this.#client.zadd(TABLE, personId, JSON.stringify(dbPerson))
    func(null)
  }

  async putPersonBack(personId, func) {
    super.putPersonBack(personId)

    try {
      const reply = await this.#client.zrangebyscore(TABLE, `${personId}`, `${personId}`)
      if(reply.length === 0) {
        throw new Error()
      }

      const dbPerson = JSON.parse(reply[0])
      if (dbPerson.deleted === 0) {
        throw new Error()
      }
      dbPerson.deleted = 0
      await this.#client.zremrangebyscore(TABLE, `${personId}`, `${personId}`)
      await this.#client.zadd(TABLE, personId, JSON.stringify(dbPerson))
      func(null)
    } catch (e) {
      func(e)
    }
  }

  async deletePersonsByUserId(userId, func) {
    super.deletePersonsByUserId(userId)

    try {
      const replyPersons = await this.#client.zrange(TABLE, 0, -1)

      if (replyPersons.length === 0) {
        throw new Error()
      }

      const personsByUserId = replyPersons
        .map(JSON.parse)
        .filter(person => person.user_id === +userId && person.deleted === 0)

      if (personsByUserId.length === 0) {
        throw new Error()
      }

      for (const person of personsByUserId) {
        const reply = await this.#client.zrangebyscore(TABLE, `${person.id}`, `${person.id}`)
        const dbPerson = JSON.parse(reply[0])
        dbPerson.deleted = 1
        await this.#client.zremrangebyscore(TABLE, `${person.id}`, `${person.id}`)
        await this.#client.zadd(TABLE, person.id, JSON.stringify(dbPerson))
      }

      func(null)
    } catch (e) {
      func(e)
    }
  }

  async putPersonsBackByUserId(userId, func) {
    super.putPersonsBackByUserId(userId)

    try {
      const replyPersons = await this.#client.zrange(TABLE, 0, -1)

      if (replyPersons.length === 0) {
        throw new Error()
      }

      const personsByUserId = replyPersons
        .map(JSON.parse)
        .filter(person => person.user_id === +userId && person.deleted === 1)

      if (personsByUserId.length === 0) {
        throw new Error()
      }

      for (const person of personsByUserId) {
        const reply = await this.#client.zrangebyscore(TABLE, `${person.id}`, `${person.id}`)
        const dbPerson = JSON.parse(reply[0])
        dbPerson.deleted = 0
        await this.#client.zremrangebyscore(TABLE, `${person.id}`, `${person.id}`)
        await this.#client.zadd(TABLE, person.id, JSON.stringify(dbPerson))
      }

      func(null)
    } catch (e) {
      func(e)
    }
  }
}





export { RedisConnector }