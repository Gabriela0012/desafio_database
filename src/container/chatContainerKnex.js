import config from '../setting/mysqlite3.js'
import sqliteBase from "../database/sqlBase.js"


let database = new sqliteBase(config, 'messages');

class chatContainerKnex{
  createMessagesTable = async () => {
    try {
      database = new sqliteBase(config, 'messages') 
      await database.createTable()
    } catch (error) {
      console.log({Server: error})
    }
  } 
  getAllChats = async () => {
    try {
      database = new sqliteBase(config, 'messages') 
      const allMessages = await database.getAll()
      return allMessages
    } catch (error) {
      console.log({Server: error})
    }
  }

  addChat = async (message) => {
    try {
      database = new sqliteBase(config, 'messages') 
      const prevMessages = await database.getAll()
      const currentDate = new Date().toLocaleString()

      

      const newMessage = {
     
        userName: message.userName ? message.userName : 'Pablito',
        date: currentDate,
        message: message.message ? message.message : '(Empty message)',
      }
      database = new sqliteBase(config, 'messages')     
      await database.save(newMessage)
    } catch (error) {
      console.log({Server: error})
    }
  }



}

export default chatContainerKnex