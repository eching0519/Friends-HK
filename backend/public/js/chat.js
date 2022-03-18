const socket = io()

// Element
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })   // Get data from URL

// -- Receive Message --
socket.on('message', (message) => {

    const html = Mustache.render(messageTemplate, {
        sender: message.sender,
        message: message.text,
        date: moment(message.createdAt).format('DD-MMM-YY'),
        time: moment(message.createdAt).format('hh:mm:ss')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

// -- Send Message --
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // disable button
    $messageFormButton.setAttribute('disabled', 'disabled')
    
    const message = e.target.elements.message.value

    socket.emit('sendMessage', room, username, message, (msg) => {
        // enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        console.log('The message was delivered!', msg)
    })
})

socket.emit('join', { room, username })