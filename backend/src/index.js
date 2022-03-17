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
const router=express.Router();



const port = process.env.PORT || 8080
// const publicDirectoryPath = path.join(__dirname, '../public')

// Model
const Message = require('./models/message')

// app.use(express.static(publicDirectoryPath))

// Socket
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
const { Session } = require('inspector')
app.use('/user/profile/picture', express.static(path.join(__dirname, '..', '_file/profilePicture')))
app.use('/user',userRoute)
app.use('/admin',adminRoute)

//set-up of body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })
//

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






