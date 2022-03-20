const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const sessions = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080
// const publicDirectoryPath = path.join(__dirname, '../public')

// Model
const Message = require('./models/message')

// app.use(express.static(publicDirectoryPath))

// Socket
/*
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ username, room }) => {
        socket.join(room)

        socket.emit('message', new Message('Welcome!'))
        socket.broadcast.to(room).emit('message', new Message(`${username} has joined!`))
    })

    socket.on('sendMessage', (message, callback) => {
        io.to('1111').emit('message', new Message(message))
        callback('Delivered')
    })

    socket.on('disconnect', () => {
        io.to('1111').emit('message', new Message('A user has left!'))
    })
})

*/

const { addUser, removeUser, getUser, getUsersInRoom } = require('./socketioHelper');

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on("join", ({ name, room }, callback) => {
        console.log(name, room);

        const { error, user } = addUser({ id: socket.id, name, room });

        socket.join(room);

        //socket.emit("message", { user: 'admin', text: `${name}, welcome to room ${room}.` });
        io.to(room).emit('message', {  text: `${name} has joined!` });

        //io.to(room).emit('message', { name: name, message: "from admin: hello"});

        //callback()
    })

    socket.on('sendMessage', (room, message, callback) => {
        //const user = getUser(socket.id);

        io.to(room).emit('message', { text: message });

        //callback();
    });

    socket.on('connect', () => {
    })

    socket.on('disconnect', (reason) => {
        console.log(reason);
        //const user = removeUser(socket.id);

        //if (user) {
            //io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        //}
    })
})

// Session
app.use(sessions({
    secret: "CSCI3100ProjectSecretKey%A8O57!P@f$zb20*wT7xEmar8fVDGWb",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 12 },     // 12 hours
    resave: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Route
const userRoute = require('./routes/user')
const { Session } = require('inspector')
app.use('/user', userRoute)

// Route for testing
app.get('/checkSession', (req, res, next) => {
    res.write(JSON.stringify(req.session, null, "\t"));
    res.end();
})

mongoConnect(() => {
    server.listen(port, () => {
        console.log(`Server is up on port ${port}!`)
    })
})


