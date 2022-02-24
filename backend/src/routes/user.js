const http = require('http');
const express = require('express');
const userRouter = express.Router();

const User = require('../models/user')

const userController = require('../controllers/user')

// userController.initUserController();

userRouter.post('/login', userController.login)
userRouter.post('/login/email', userController.loginByEmail)
userRouter.post('/login/verify', userController.loginVerify)
userRouter.post('/register', userController.createNewAccount)
userRouter.get('/activate', userController.activateAccount)
userRouter.get('/logout', userController.logout)
userRouter.get('/profile', userController.getUserInfo)

userRouter.post('/profile/picture/update', userController.updateProfilePicture)
userRouter.post('/profile/preferences/update', userController.updatePreferences)
userRouter.post('/profile/password/update', userController.updatePassword)

module.exports = userRouter;