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

userRouter.post('/profile/picture/update', fileEngine.single('picture'), userController.updateProfilePicture)
userRouter.post('/profile/preferences/update', userController.updatePreferences)
userRouter.post('/profile/password/update', userController.updatePassword)

// userRouter.post('/profile/picture/upload', upload.single('picture'), (req, res, next)=> {
//     res.write(JSON.stringify({
//         "success": true
//     }, null, "\t"));
//     res.end();
// })

module.exports = userRouter;