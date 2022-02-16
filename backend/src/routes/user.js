const http = require('http');
const express = require('express');
const userRouter = express.Router();

const User = require('../models/user')

const userController = require('../controllers/user')

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.createNewUser)

module.exports = userRouter;