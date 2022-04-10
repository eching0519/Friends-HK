const http = require('http');
const express = require('express');
const path = require('path')
const friendRouter = express.Router();

const Friend = require('../models/friend')

const friendController = require('../controllers/friend')


friendRouter.post('/sendRequest', friendController.SendFriendRequest)
friendRouter.post('/rejectRequest', friendController.RejectRequest)
friendRouter.post('/acceptRequest', friendController.AcceptRequest)
friendRouter.post('/cancelRequest', friendController.CancelRequest)
friendRouter.post('/findRequest', friendController.FindRequest)
friendRouter.post('/userFriendRequest', friendController.FindUserFriendRequest)
friendRouter.post('/listfriendinfo', friendController.ListFriendInfo)

module.exports = friendRouter;