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
const Chatbox = require('./models/chatbox')

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

let matchUserQueue = [];
let matchTimerFlag = false; //indicate start the 10s countdown
let matchInterval;
const specialThemeQueue = {}; //queue for storing user id in special matching function
const WURuserCount = {};    //count number of user have answer the WUR question

// Socket
io.on('connection', (socket) => {
    console.log('New WebSocket connection, id:', socket.id);
    console.log(io.sockets.allSockets());

    socket.on("joinRoom", ({ userId, name, roomId }, callback) => {
        socket.join(roomId);    //add user to romm by room id.
        console.log(`user: ${name} assign to ${roomId}`);
        console.log(io.in(roomId).allSockets());    //log all socket in room

        console.log(`socket: ${socket.id}\n\n`);

        socket.emit('systemMessage', { roomId: roomId, message: { message: `You(${name}) are now in room: ${roomId}`, senderId: 'admin', timeElapse: Date.now() } });
        socket.broadcast.to(roomId).emit('systemMessage', { roomId: roomId, message: { message: `From system: ${name} has joined!`, senderId: 'admin', timeElapse: Date.now() } });

    });

    socket.on("leaveRoom", ({ userId, name, roomId }, callback) => {
        socket.leave(roomId);
        console.log(io.in(roomId).allSockets());  //log sockets remain in room
        console.log(`user: ${name} leave room: ${roomId}`);

        var returnMsg = new Chatbox('admin', `From system: ${name} left.`, Date.now());
        io.to(roomId).emit('message', { roomId: roomId, message: returnMsg });
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

        // io.to(roomId).emit('message', { message: message.message, senderId: message.senderId, timeElapse: message.timeElapse });
        io.to(roomId).emit('message', { roomId: roomId, message: cb });

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
            let usersInfo = {};
            for (let i = 0; i < participants.length; i++) {
                participantId = participants[i];
                user = await User.findById(participantId);
                usersInfo[participantId] = user;
                // Not going to find current user's name
                if (userId != participantId) names.push(user.name);
            }

            allChatrooms.chatroom[index].usersInfo = usersInfo;
            allChatrooms.chatroom[index].name = names.toString().replace(',', ', ');
        }
        // --- Friend chatroom ---
        for (let index = 0; index < allChatrooms.friendChatroom.length; index++) {
            //const element = array[index];
            //console.log('object element:', allChatrooms[index]);
            participants = allChatrooms.friendChatroom[index].users;

            let names = [];
            let usersInfo = {};
            for (let i = 0; i < participants.length; i++) {
                participantId = participants[i];
                user = await User.findById(participantId);
                usersInfo[participantId] = user;
                // Not going to find current user's name
                if (userId != participantId) names.push(user.name);
            }

            allChatrooms.friendChatroom[index].usersInfo = usersInfo;
            allChatrooms.friendChatroom[index].name = names.toString().replace(',', ', ');
        }

        callback(allChatrooms);
    });

    socket.on("getUserInfo", async (userId, callback) => {
        console.log("getUserInfo requiest recieved, user id:", userId);

        let userObject = await User.findById(userId);

        callback({ userName: userObject.name, picture: userObject.picture });
    });

    //havent test it... coz i cant...
    socket.on("sendMatch", (user, callback) => {    //listen to match event emit...
        console.log(`match recieve from ${user.id}`);
        socket.join('randommatch'); //may not useful
        matchUserQueue.push({ userId: user.id, socket: socket });   //save user id and its socket into queue for bookkeeping

        callback("match request recieved"); //send recieve event success message back to client

        //match algorithm placeholder. dont know wheather its work...
        if (matchTimerFlag) {   //flag, avoid duplicate set interval being setup...
            matchTimerFlag = false; //so that other emit event would not run this block of code.
            matchInterval = setInterval(async () => {   //check matching for every 10s

                console.log("start grouping user");
                console.log("current user queue length:", matchUserQueue.length);


                if (matchUserQueue.length >= 3) {   // if there are enough user request,
                    console('got enough user, start grouping');

                    //gernerate 3 random index base on user queue array
                    let i = 0;
                    let j = 0;
                    let k = 0;

                    let min = Math.ceil(0);
                    let max = Math.floor(matchUserQueue.length);

                    i = Math.floor(Math.random() * (max - min) + min);

                    while (i == j) {    //avoid duplicate index
                        j = Math.floor(Math.random() * (max - min) + min);
                    }

                    while (k == i || k == j) {  //avoid duplicate index
                        k = Math.floor(Math.random() * (max - min) + min);
                    }

                    //store {user, socket} pair.
                    let user1 = matchUserQueue[i];
                    let user2 = matchUserQueue[j];
                    let user3 = matchUserQueue[k];


                    let cr = new Chatrooms([user1.userId, user2.userId, user3.userId],  //create new chatroom.
                        `${user1.userId},${user2.userId},${user3.userId}`);

                    await cr.saveAsGroupChatroom();
                    let roomId = cr._id.toString();
                    
                    //remove matched user from user queue
                    let index = matchUserQueue.indexOf(user1);
                    matchUserQueue = matchUserQueue.slice(index, 1);
                    index = matchUserQueue.indexOf(user2);
                    matchUserQueue = matchUserQueue.slice(index, 1);
                    index = matchUserQueue.indexOf(user3);
                    matchUserQueue = matchUserQueue.slice(index, 1);


                    user1.socket.emit("waitMatch", roomId); //emit room id back to client
                    user2.socket.emit("waitMatch", roomId); //emit room id back to client
                    user3.socket.emit("waitMatch", roomId); //emit room id back to client

                    // may not need to reset interval...
                    //matchTimerFlag = true;  
                    //clearInterval(matchInterval);
                } else {
                    console('not enough user'); //if there are <3 user.
                }
                
            }, 10000);  //10s interval
        }


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
            console.log("key found");
            let index = specialThemeQueue[`${theme}`].indexOf(userId);
            specialThemeQueue[`${theme}`] = specialThemeQueue[`${theme}`].slice(index, 1);  //remove user id from userid queue.
        } else {
            console.log("key not found")
        }

        console.log(specialThemeQueue); //log
        callback("success");
    });

    let roomsize = 2;   //change roomsize here (2 -> 3)
    socket.on("joinWouldURgame", (userName, roomId, callback) => {
        socket.join(`wur:${roomId}`)    //join user to WUR session
        console.log(`user: ${userName} join the would you rather game. ${roomId}`)

        callback('join a game successfully!');

        // console.log(questions[0]);
        if (io.sockets.adapter.rooms.get(`wur:${roomId}`).size >= roomsize) {
            const { questions } = require('./models/wyrQuestion');  //get question bank
            //create random index
            let min = Math.ceil(0);
            let max = Math.floor(70);
            let i = Math.floor(Math.random() * (max - min) + min);

            //assign random question by index
            io.to(`wur:${roomId}`).emit("assignWouldURgameQuestion", questions[i], true);   //true indicate client can start
        }


    });

    socket.on("sendWouldURanswer", (userName, roomId, answer, result, callback) => {
        result = { ...result, [userName]: answer };
        //socket.join(`wur:${roomId}`)
        console.log(`${userName} choice: ${answer}`);
        callback('answer recieve from user:', userName);
        if (`wur:${roomId}` in WURuserCount) {  //save user id to specialThemeQueue.
            console.log("key found");
            WURuserCount[`wur:${roomId}`]++;
        } else {
            console.log("key not found");
            WURuserCount[`wur:${roomId}`] = 1;
        }
        io.to(`wur:${roomId}`).emit("waitResponseUserName", userName, answer, result);

        // Next question
        if (Object.values(result).length >= roomsize) {
            // if (WURuserCount[`wur:${roomId}`] >= roomsize) {   //if 2(or 3) answers recieved  
            const { questions } = require('./models/wyrQuestion');  //get question bank
            WURuserCount[`wur:${roomId}`] = 0;  //reset user count

            //get random index
            let min = Math.ceil(0);
            let max = Math.floor(70);
            let i = Math.floor(Math.random() * (max - min) + min);

            myTimer = setTimeout(() => {
                io.to(`wur:${roomId}`).emit("assignWouldURgameQuestion", questions[i], true);   //set new question after 4 second
            }, 4000)
            // clearTimeout(myTimer);

        }

    });

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


