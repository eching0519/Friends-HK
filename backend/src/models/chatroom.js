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
    static findById = async (id) => {
        const db = getDatabase();
        var chatroom;
        return await db.collection('chatroom')
                        .find({ '_id': ObjectID(id) })
                        .next()
                        .then((data) => {
                            chatroom = new Chatroom(data.users, data.name);
                            chatroom._id = data._id;
                            chatroom.chatbox = data.chatbox;
                            return chatroom
                        })
                        .catch(err => {
                            throw err;
                        });
    }

    constructor(users, chatboxName = users.toString()) {
        this.name = chatboxName;
        this.users = users;
        this.chatbox = [];
    }

    async create() {
        const db = getDatabase();
        await db.collection('chatroom').insertOne(this).then(result => {this._id = result.insertedId});

        var userId;
        for (let i = 0; i < this.users.length; i++) {
            userId = this.users[i];
            // UserChatrooms.addRoom(user, this._id);
            await db.collection('user-chatrooms').updateOne( { _id: ObjectID(userId) },
                                                             { $push: { 'chatroom': this._id} },
                                                             { upsert: false })
        }
        return this;
    }

    async addChatBox(chatbox) {
        let db = getDatabase();
        console.log(chatbox)
        return await db.collection('chatroom').updateOne( { _id: this._id },
                                                    { $push: { 'chatbox': chatbox} },
                                                    { upsert: false })
    }
}

module.exports = Chatroom