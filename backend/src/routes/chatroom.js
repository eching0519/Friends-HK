const http = require('http');
const express = require('express');
const path = require('path');
const chatroomRouter = express.Router();

const Message = require('../models/message')

chatroomRouter.post('/chatroom', (req, res, next) => {
    var io = req.app.get('socketio')

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
})

module.exports = chatroomRouter;