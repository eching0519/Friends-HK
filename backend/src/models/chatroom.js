const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;
const Chatbox = require('./chatbox')

class Chatroom {
    
    constructor(users) {
        this.id = null;
        this.name = users.toString();
        this.users = users;
        this.chatbox = [];
    }

    async create() {
        const db = getDatabase();
        return db.collection('chatroom').insertOne(this).then(result => {this.id = result.insertedId});
    }

    addChatBox(sender, message, timeElapse = Date.now()) {
        // this.chatbox.push({
        //     'sender': sender,
        //     'message': message,
        //     'timeElapse': timeElapse
        // });
        let db = getDatabase();
        return db.collection('chatroom').updateOne( { _id: this.id },
                                                    { $push: {
                                                        'sender': sender,
                                                        'message': message,
                                                        'timeElapse': timeElapse
                                                    } },
                                                    { upsert: false })
    }
}

module.exports = Chatroom

console.log(Date.now())
console.log(new Date(Date.now()))