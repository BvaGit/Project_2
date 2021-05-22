import { Server } from './Server.js'
import dotenv from 'dotenv'

dotenv.config()


const server = new Server()

server.serve( () => {
  console.log('-----------Server has been started--------');
})