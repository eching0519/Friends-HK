const http = require('http');
const express = require('express');
const path = require('path')
const userRouter = express.Router();

const User = require('../models/user')

const userController = require('../controllers/user')
const fileEngine = require('../util/fileEngine');

// userController.initUserController();




userRouter.post('/login', userController.login)
userRouter.post('/login/email', userController.loginByEmail)
userRouter.post('/login/verify', userController.loginVerify)
userRouter.post('/register', userController.createNewAccount)
userRouter.get('/activate', userController.activateAccount)
userRouter.get('/logout', userController.logout)
userRouter.get('/profile', userController.getUserInfo)

userRouter.post('/forgotPassword/mail', userController.forgotPasswordEmail)
userRouter.post('/forgotPassword/reset', userController.resetForgottenPassword)

userRouter.post('/profile/picture/update', fileEngine.single('picture'), userController.updateProfilePicture)
userRouter.post('/profile/preferences/update', userController.updatePreferences)
userRouter.post('/profile/update', userController.updateProfile)

const UserChatrooms = require('../models/user-chatrooms')
const Chatroom = require('../models/chatroom')
const Chatbox = require('../models/chatbox')

userRouter.get('/test', async (req, res, next) => {
// // --- Get All user's chatrooms ---
// var user1Id = "6235ec5b43c0614834b29d68";
// let chatrooms = await UserChatrooms.findAllChatroomsByUserId(user1Id)
// console.log("Chat", JSON.stringify(chatrooms, null, "\t"))

// // --- Get user information ---
// var user1Id = "6235ec5b43c0614834b29d68";
// var user2Id = "6235eccc43c0614834b29d69";
// var user1Obj = await User.findById(user1Id)
// var user2Obj = await User.findById(user2Id)
// console.log("User1's name", user1Obj.name)
// console.log("User1's picture", user1Obj.picture)    // User's picture can be undefined
// console.log("User2's name", user2Obj.name)
// console.log("User1's picture", user2Obj.picture)

// // --- Create New Chatroom ---
// var user1Id = "6235ec5b43c0614834b29d68";
// var user2Id = "6235eccc43c0614834b29d69";
// var cr = new Chatroom([user1Id, user2Id]);  // Create chatroom by array of user id
// await cr.create();                      // Save chatroom to database
// console.log("Chatroom Id", cr._id.toString());         // Get chatroom Id
// var cb = new Chatbox(user1Id, 'Hi', Date.now());      // Create new chatbox. timeElapse is default to be Date.now(), so that it is obtional parameter
// await cr.addChatBox(cb);                                  // Save chatbox to chatroom in database
// cb = new Chatbox(user2Id, 'Hi');
// await cr.addChatBox(cb);
})

// userRouter.post('/profile/picture/upload', upload.single('picture'), (req, res, next)=> {
//     res.write(JSON.stringify({
//         "success": true
//     }, null, "\t"));
//     res.end();
// })

module.exports = userRouter;