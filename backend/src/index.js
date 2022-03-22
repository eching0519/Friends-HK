const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const sessions = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// const router=express.Router();



const port = process.env.PORT || 8080

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
const adminRoute = require('./routes/admin')
// const chatroomRoute = require('./routes/chatroom')
const { Session } = require('inspector')
app.use('/user/profile/picture', express.static(path.join(__dirname, '..', '_file/profilePicture')))
app.use('/user', userRoute)
app.use('/admin', adminRoute)
// app.set('socketio', io)
// app.use('/', chatroomRoute)

// Route for testing
app.get('/checkSession', (req, res, next) => {
    res.write(JSON.stringify(req.session, null, "\t"));
    res.end();
})
// Connection of mongDB
mongoConnect(() => {
    server.listen(port, () => {
        console.log(`Server is up on port ${port}!`)
    })
})


// Model
const Message = require('./models/message')

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// Socket
const { addUser, removeUser, getUser, getUsersInRoom } = require('./socketioHelper');
let room1 = []; //sockets in room1  (workaround)
const user = [];


io.on('connection', (socket) => {
    console.log('New WebSocket connection, id:', socket.id);

    socket.on("joinRoom", ({ name, room }, callback) => {
        //const { error, user } = addUser({ id: socket.id, name, room });
        //add user to specific room:
        //room1.push(socket);
        //console.log(room1.length);

        socket.join(room);
        console.log(`user: ${name} assign to ${room}`);
        console.log(io.in(room).allSockets());
        socket.emit('message', { text: `You are now in room: ${room}`, name: 'admin' });
        socket.broadcast.to(room).emit('message', { text: `From system: ${name} has joined!`, name: 'admin' });
        //io.to(room).emit('message', { text: `From system: ${name} has joined! + from io.to(room).emit`, name: 'admin'  });

    })

    socket.on("leaveRoom", ({ name, room }, callback) => {
        socket.leave(room);
        console.log(io.in(room).allSockets());  //log sockets remain in room
        console.log(`user: ${name} leave room: ${room}`);

        io.to(room).emit('message', { text: `From system: ${name} left.` });
    })

    socket.on("pingRoom", ({ name, room }, callback) => {
        console.log(io.in(room).allSockets());

        //socket.emit('message', { text: `You are now in room: ${room}` });
        //io.to(room).emit('message', { text: `From system: ${name} left.`, name: 'admin' });
    })

    socket.on("sendMessage", ({ room }, message, callback) => {
        console.log('sockets in room before force join:', io.in(room).allSockets());

        //console.log(room1.length);
        room1.forEach(element => {
            //console.log(element);
            //element.join(room); //workaround to force join all sockets back to the room
        })

        //console.log('in room:', room);  //no user...

        //console.log('socket.room: ', socket.room);

        io.to(room).emit('message', { text: `${message.text} + from io.to(room).emit`, name: message.name });


        //socket.emit('message', { text: `${message.text} + from socket.emit`, name: message.name });
        //socket.broadcast.to(room).emit('message', { text: `${message.text} + from socket.broadcast.to`, name: message.name  });
        //io.emit('message', { text:  `${message.text} + from io.emit`, name: message.name  }); //only this work...
        //socket.to(room).emit('message', { text: `${message.text} + from socket.to(room).emit`, name: message.name  });

        callback(message);
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
/*
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ room, username }) => {
        socket.join(room)

        socket.emit('message', new Message('System', 'Welcome!'))
        socket.broadcast.to(room).emit('message', new Message('System', `${username} has joined!`))
    })

    socket.on('sendMessage', (room, sender, message, callback) => {
        io.to(room).emit('message', new Message(sender, message))
        callback('Delivered')
    })

    socket.on('disconnect', (room, user) => {
        io.to(room).emit('message', new Message('System', user + ' has left!'))
    })
})
*/
