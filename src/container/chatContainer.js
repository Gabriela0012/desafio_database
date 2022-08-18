import * as fs from 'fs'
import __dirname from '../utils.js'

class chatContainer{
    constructor(){
        this.path = __dirname+'/files/Chat.json'
    }

    getAllChats = async()=>{
        try {
            if(fs.existsSync(this.path)){
                let fileData = await fs.promises.readFile(this.path, 'utf-8')
                let historyChats = JSON.parse(fileData)
                return historyChats
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    addChat = async(historyChat) =>{
        try {
            let historyChats = await this.getAllChats()
            if(historyChats.length === 0){
                historyChat.id = 1
                historyChats.push(historyChat)
                await fs.promises.writeFile(this.path,JSON.stringify(historyChats, null, '\t'))
                return historyChat.id
            }else{
                historyChat.id =historyChats[historyChats.length-1].id+1
                historyChats.push(historyChat)
                await fs.promises.writeFile(this.path,JSON.stringify(historyChats, null, '\t'))
                return historyChat.id
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default chatContainer