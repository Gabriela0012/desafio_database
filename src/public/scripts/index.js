const socket = io({
    autoConnect: false
});

function chatSocket() {
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { userName: userName, message: chatBox.value })
        chatBox.value = ''
    }
}

const header = document.getElementById('header')
Swal.fire({
    title: 'Usuario',
    input: 'text',
    text: 'Ingrese un nombre de usuario',
    inputValidator: (value => {
        return !value && 'Porfavor ingrese un usuario para continuar'
    }),
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    userName = result.value
    socket.connect()
    header.innerText = userName
})

// enviar un nuevo mensaje
const chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter') {
        chatSocket()
    }
})

const sendButton = document.getElementById('send')
sendButton.addEventListener('click', () => {
    chatSocket()
})

//escuchar los mensajes
socket.on('log', (data) => {
    const chats = document.getElementById('chats')
    chats.innerText = ''
    chats.innerHTML = chatsHTML(data)
    chats.scrollTop = chats.scrollHeight
})

// renderiza los productos
socket.on('productList', (data) => {
    let listProducts = document.getElementById('listProducts')
    listProducts.innerText = ''
    listProducts.innerHTML = createProductListHTML(data.products)
})


// agrega un producto al DOM 
const productName = document.getElementById('name')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const btn = document.getElementById('btnSubmit')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    let product = {}
    if (productName.value.trim().length > 0 && thumbnail.value.trim().length > 0) {
        product.name = productName.value
        product.price = price.value
        product.thumbnail = thumbnail.value
        socket.emit('addProduct', product)
        productName.value = ''
        price.value = ''
        thumbnail.value = ''
    } else {
        Swal.fire({
            text: "don't let void fields on form!",
            toast: true
        })
    }
})
