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
io.on('connection', (socket) => {
    console.log('New WebSocket connection, id:', socket.id);

    socket.on("joinRoom", ({ userId, name, roomId }, callback) => {
        socket.join(roomId);    //add user to romm by room id.
        console.log(`user: ${name} assign to ${roomId}`);
        console.log(io.in(roomId).allSockets());    //log all socket in room

        socket.emit('message', { message: `You are now in room: ${roomId}`, senderId: 'admin', timeElapse: Date.now() });
        socket.broadcast.to(roomId).emit('message', { message: `From system: ${name} has joined!`, senderId: 'admin', timeElapse: Date.now() });

    });

    socket.on("leaveRoom", ({ userId, name, roomId }, callback) => {
        socket.leave(roomId);
        console.log(io.in(roomId).allSockets());  //log sockets remain in room
        console.log(`user: ${name} leave room: ${roomId}`);

        io.to(roomId).emit('message', { message: `From system: ${name} left.`, senderId: 'admin', timeElapse: Date.now() });
    });

    socket.on("pingRoom", ({ name, roomId }, callback) => {
        console.log(io.in(roomId).allSockets());

        //socket.emit('message', { text: `You are now in room: ${room}` });
        //io.to(room).emit('message', { text: `From system: ${name} left.`, name: 'admin' });
    });

    socket.on("sendMessage", ({ roomId }, message, callback) => {
        //console.log('sockets in room before force join:', io.in(room).allSockets());

        io.to(roomId).emit('message', { message: message.message, senderId: message.senderId, timeElapse: message.timeElapse });

        callback(message);
    });


    socket.on("getChatRoomList", async (userId, callback) => {
        console.log("getChatRoomList requiest recieved, user id:", userId);

        const UserChatrooms = require('./models/user-chatrooms');
        const User = require('./models/user');
        let allChatrooms = await UserChatrooms.findAllChatroomsByUserId(userId);

        for (let index = 0; index < allChatrooms.length; index++) {
            //const element = array[index];
            //console.log('object element:', allChatrooms[index]);

            let userIdstring = allChatrooms[index].name;
            let userIdarr = userIdstring.split(",");

            let user1Name;
            let user2Name;

            let user1Obj = await User.findById(userIdarr[0]);
            let user2Obj = await User.findById(userIdarr[1]);
            if (userIdarr.length == 2) {

                user1Name = user1Obj.name;
                user2Name = user2Obj.name;

                let parsedNameStr = `${user1Name},${user2Name}`;
                console.log(user1Name, user2Name);
                allChatrooms[index].name = parsedNameStr;

            }
            
        }

        callback(allChatrooms);
    });

    socket.on("getUserInfo", async (userId, callback) => {
        console.log("getUserInfo requiest recieved, user id:", userId);

        const User = require('./models/user');
        let userObject = await User.findById(userId);

        //console.log(userObject.name);

        callback({ userName: userObject.name, picture: userObject.picture });
    });

    //match by special theme
    socket.on("matchBySpecialTheme", (theme, user, callback) => {
        console.log(`recieved match request: theme: ${theme}, username: ${user}`);

        socket.join(theme);

        if (io.sockets.adapter.rooms.get(theme).size >= 3) {
            console.log(`able to form group for special theme: ${theme}`);
            //console.log(io.sockets.adapter.rooms.get(theme));
            io.sockets.adapter.rooms.get(theme).forEach(element => {
                console.log(element);
                io.sockets.sockets.get(element).emit("waitMatch");
            });

        }
        let numberofpeople = io.sockets.adapter.rooms.get(theme).size;
        callback(numberofpeople);
    });

    /*     socket.on('connect', () => {
        }); */

    socket.on('disconnect', (reason) => {
        console.log(reason);
    });
})

/**
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


