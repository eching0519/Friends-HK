const http = require('http');
const express = require('express');
const path = require('path')
const friendRouter = express.Router();

const Friend = require('../models/friend')

const friendController = require('../controllers/friend')


friendRouter.post('/sendRequest', friendController.SendFriendRequest)
friendRouter.post('/rejectRequest', friendController.RejectRequest)
friendRouter.post('/acceptRequest', friendController.AcceptRequest)

module.exports = friendRouter;