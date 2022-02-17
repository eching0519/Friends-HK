const http = require('http');
const express = require('express');
const userRouter = express.Router();

const User = require('../models/user')

const userController = require('../controllers/user')

// userController.initUserController();

userRouter.post('/login', userController.login)
userRouter.post('/login/verify', userController.loginVerify)
userRouter.post('/register', userController.createNewAccount)
userRouter.get('/activate', userController.activateAccount)

module.exports = userRouter;