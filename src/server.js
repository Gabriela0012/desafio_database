import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productContainerKnex from './container/productContainerKnex.js'
import chatContainerKnex from './container/chatContainerKnex.js'

const app = express()
const productService = new productContainerKnex();
const chatService = new chatContainerKnex();


const server = app.listen(8080, () => {
  productService.createProductsTable();
  chatService.createMessagesTable();
  console.log('listening on 8080 port \n')
})


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)

const io = new Server(server)
let products
let log

io.on('connection', async (socket) => {

  products = await productService.getAllProduct()

  log = await chatService.getAllChats()

  console.log('Socket connected')
  socket.broadcast.emit('newUserConnected')
  io.emit('log', log)
  socket.emit('productList', { products })

  socket.on('message', async(data) => {
    let currentTime = new Date();
    data.date = currentTime.toLocaleTimeString();
    await chatService.addChat(data)

    log = await chatService.getAllChats()
    io.emit('log', log)
  })
    
  socket.on('addProduct', async (data) => {
    await productService.addNewProduct(data)
    products = await productService.getAllProduct()
    io.emit('productList', { products })
  })

    
})
