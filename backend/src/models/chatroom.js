// var user1 = "6235ec5b43c0614834b29d68";
// var user2 = "6235eccc43c0614834b29d69";
// var cr = new Chatroom([user1, user2]);  // Create chatroom by array of user id
// await cr.create();                      // Save chatroom to database
// console.log(cr._id.toString());         // Get chatroom Id
// var cb = new Chatbox(user1, 'Hi', Date.now());      // Create new chatbox. timeElapse is default to be Date.now(), so that it is obtional parameter
// cr.addChatBox(cb);                                  // Save chatbox to chatroom in database
// cb = new Chatbox(user2, 'Hi');

const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

const UserChatrooms = require('./user-chatrooms');

class Chatroom {
    
    constructor(users) {
        this.name = users.toString();
        this.users = users;
        this.chatbox = [];
    }

    async create() {
        const db = getDatabase();
        var user;
        await db.collection('chatroom').insertOne(this).then(result => {this._id = result.insertedId});

        for (let i = 0; i < this.users.length; i++) {
            user = this.users[i];
            await UserChatrooms.addRoom(user, this._id);
        }
        return this;
    }

    addChatBox(chatbox) {
        let db = getDatabase();
        return db.collection('chatroom').updateOne( { _id: this.id },
                                                    { $push: { chatbox: chatbox} },
                                                    { upsert: false })
    }
}

module.exports = Chatroom