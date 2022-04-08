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
const friendRoute = require('./routes/friend')
// const chatroomRoute = require('./routes/chatroom')
const { Session } = require('inspector')
app.use('/user/profile/picture', express.static(path.join(__dirname, '..', '_file/profilePicture')))
app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/friend', friendRoute)
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
const UserChatrooms = require('./models/user-chatrooms');
const User = require('./models/user');
const Chatrooms = require('./models/chatroom');

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const specialThemeQueue = {}; //queue for storing user id in special matching function

// Socket
io.on('connection', (socket) => {
    console.log('New WebSocket connection, id:', socket.id);

    socket.on("joinRoom", ({ userId, name, roomId }, callback) => {
        socket.join(roomId);    //add user to romm by room id.
        console.log(`user: ${name} assign to ${roomId}`);
        console.log(io.in(roomId).allSockets());    //log all socket in room

        socket.emit('systemMessage', { message: `You are now in room: ${roomId}`, senderId: 'admin', timeElapse: Date.now() });
        socket.broadcast.to(roomId).emit('systemMessage', { message: `From system: ${name} has joined!`, senderId: 'admin', timeElapse: Date.now() });

    });

    socket.on("leaveRoom", ({ userId, name, roomId }, callback) => {
        socket.leave(roomId);
        console.log(io.in(roomId).allSockets());  //log sockets remain in room
        console.log(`user: ${name} leave room: ${roomId}`);

        io.to(roomId).emit('message', { message: `From system: ${name} left.`, senderId: 'admin', timeElapse: Date.now() });
    });

    /* socket.on("pingRoom", ({ name, roomId }, callback) => {
        console.log(io.in(roomId).allSockets());

        socket.emit('message', { text: `You are now in room: ${room}` });
        io.to(room).emit('message', { text: `From system: ${name} left.`, name: 'admin' });
    }); */

    socket.on("sendMessage", async (roomId, message, callback) => {
        //console.log('sockets in room before force join:', io.in(room).allSockets());
        const Chatroom = require('./models/chatroom');
        const Chatbox = require('./models/chatbox');

        let cb = new Chatbox(message.senderId, message.message, message.timeElapse);
        let cr = await Chatroom.findById(roomId);
        console.log("chatroom:", cr);
        cr.addChatBox(cb);

        io.to(roomId).emit('message', { message: message.message, senderId: message.senderId, timeElapse: message.timeElapse });

        callback(message);
    });

    socket.on("getChatRoom", async (roomId, callback) => {
        let cr = await Chatrooms.findById(roomId);
        let usersInfo = {};
        var uId, user;
        for (let i = 0; i < cr.users.length; i++) {
            uId = cr.users[i];
            user = await User.findById(uId);
            usersInfo[uId] = user;
        }
        cr.usersInfo = usersInfo;
        callback(cr);
    });

    socket.on("getChatRoomList", async (userId, callback) => {
        console.log("getChatRoomList requiest recieved, user id:", userId);

        let allChatrooms = await UserChatrooms.findAllChatroomsByUserId(userId);

        // Find friend's name by their Id
        var participants;
        var participantId;
        var user;
        // --- Group chatroom ---
        for (let index = 0; index < allChatrooms.chatroom.length; index++) {
            //const element = array[index];
            //console.log('object element:', allChatrooms[index]);
            participants = allChatrooms.chatroom[index].users;

            let names = [];
            for (let i = 0; i < participants.length; i++) {
                participantId = participants[i];
                // Not going to find current user's name
                if (userId == participantId) continue
                user = await User.findById(participantId);
                names.push(user.name);
            }

            allChatrooms.chatroom[index].name = names.toString().replace(',', ', ');
        }
        // --- Friend chatroom ---
        for (let index = 0; index < allChatrooms.friendChatroom.length; index++) {
            //const element = array[index];
            //console.log('object element:', allChatrooms[index]);
            participants = allChatrooms.friendChatroom[index].users;

            let names = [];
            for (let i = 0; i < participants.length; i++) {
                participantId = participants[i];
                // Not going to find current user's name
                if (userId == participantId) continue
                user = await User.findById(participantId);
                names.push(user.name);
            }

            allChatrooms.friendChatroom[index].name = names.toString().replace(',', ', ');
        }

        callback(allChatrooms);
    });

    socket.on("getUserInfo", async (userId, callback) => {
        console.log("getUserInfo requiest recieved, user id:", userId);

        let userObject = await User.findById(userId);

        callback({ userName: userObject.name, picture: userObject.picture });
    });

    //match by special theme
    socket.on("matchBySpecialTheme", async (theme, userId, callback) => {
        console.log(`recieved match request: theme: ${theme}, user id: ${userId}`);
        socket.join(theme);

        if (`${theme}` in specialThemeQueue) {  //save user id to specialThemeQueue.
            console.log("key found")
            specialThemeQueue[`${theme}`].push(userId);
        } else {
            console.log("key not found")
            specialThemeQueue[`${theme}`] = [userId];
        }

        console.log(specialThemeQueue);

        if (io.sockets.adapter.rooms.get(theme).size >= 3) {
            console.log(specialThemeQueue[`${theme}`]);
            console.log(`able to form group for special theme: ${theme}`);
            console.log(io.sockets.adapter.rooms.get(theme));



            const Chatroom = require('./models/chatroom');
            let cr = new Chatroom([specialThemeQueue[`${theme}`][0], specialThemeQueue[`${theme}`][1], specialThemeQueue[`${theme}`][2]],
                `${specialThemeQueue[`${theme}`][0]},${specialThemeQueue[`${theme}`][1]},${specialThemeQueue[`${theme}`][2]}`);

            await cr.saveAsGroupChatroom();

            io.sockets.adapter.rooms.get(theme).forEach(element => {
                console.log(element);

                let roomId = cr._id.toString();
                console.log("room id:", roomId);
                io.sockets.sockets.get(element).emit("waitMatch", roomId);
                //io.sockets.sockets.get(element).leave(theme); //leave the queue after matching
            });

            delete specialThemeQueue[`${theme}`];
            console.log(specialThemeQueue);
        }
        let numberofpeople = io.sockets.adapter.rooms.get(theme).size;
        callback(numberofpeople);
    });

    socket.on("cancelMatchBySpecialTheme", async (theme, userId, callback) => {
        console.log(`recieved cancel match request: theme: ${theme}, user id: ${userId}`);
        socket.leave(theme);    //leave socket room(theme queue)

        if (`${theme}` in specialThemeQueue) {
            console.log("key found")
            specialThemeQueue[`${theme}`].pop(userId);  //remove user id from userid queue.
        } else {
            console.log("key not found")
        }

        console.log(specialThemeQueue); //log
        callback("success");
    });

    socket.on("wouldURgame", (userName, roomId) => {
        socket.join(`wru:${roomId}`)
        console.log(`user: ${userName} join the would you rather game`)
        const { questions } = require('./models/wyrQuestion');

        console.log(questions[0]);


        let min = Math.ceil(0);
        let max = Math.floor(70);
        let i = Math.floor(Math.random() * (max - min) + min);
        socket.emit("wouldURgameSession", questions[i]);




        //socket.emit("wouldURgameSession", questions[0]);

    });

    /* socket.on("wouldURgame", (userName, roomId) => {
        socket.join(`wru:${roomId}`)
        console.log(`user: ${userName} join the would you rather game`)
        const { questions } = require('./models/wyrQuestion');
        console.log(questions[0]);
    }); */

    socket.on('disconnect', (reason) => {   //if there is a socket disconnection
        console.log(reason);    //log socket disconnect reason.
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


