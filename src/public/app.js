import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from '../utils.js'
import { Server } from 'socket.io'
import viewsRouter from '../routes/views.router.js'
import productContainer from '../container/productContainer.js'
import chatContainer from '../container/chatContainer.js'

const app = express()
const server = app.listen(8080, () => console.log('listening on 8080 port \n'))
const io = new Server(server)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)


const productService = new productContainer()
const chats = new chatContainer()

let products
let log

io.on('connection', async (socket) => {
    products = await productService.getAllProducts()
    log = await chats.getAllChats()

    console.log('Socket connected')
    socket.broadcast.emit('newUserConnected')
    io.emit('log', log)
    socket.emit('productList', { products })

    socket.on('message', async(data) => {
        let currentTime = new Date();
        data.date = currentTime.toLocaleTimeString();
        await chats.addChat(data)
        log = await chats.getAllChats()
        io.emit('log', log)
    })
    
    socket.on('addProduct', async (data) => {
        await productService.addProducts(data)
        products = await productService.getAllProducts()
        io.emit('productList', { products })
    })
})
