// // --- Get All user's chatrooms ---
// var user1Id = "6235ec5b43c0614834b29d68";
// let chatrooms = await UserChatrooms.findAllChatroomsByUserId(user1Id)
// console.log("Chat", JSON.stringify(chatrooms, null, "\t"))

// // --- Get user information ---
// var user1Id = "6235ec5b43c0614834b29d68";
// var user2Id = "6235eccc43c0614834b29d69";
// var user1Obj = await User.findById(user1Id)
// var user2Obj = await User.findById(user2Id)
// console.log("User1's name", user1Obj.name)
// console.log("User1's picture", user1Obj.picture)    // User's picture can be undefined
// console.log("User2's name", user2Obj.name)
// console.log("User1's picture", user2Obj.picture)

// // --- Create New Chatroom ---
// var user1Id = "6235ec5b43c0614834b29d68";
// var user2Id = "6235eccc43c0614834b29d69";
// var cr = new Chatroom([user1Id, user2Id], "Name of the new chatroom");  // Create chatroom by array of user id. 
//                                         // Chatroom 名default係UserId, 所以係怪怪地, 最好你拎完User's name之後再pass 個chatroom name落去
// await cr.create();                                                      // Save chatroom to database
// console.log("Chatroom Id", cr._id.toString());                          // Get chatroom Id

// var cb = new Chatbox(user1Id, 'Hi', Date.now());             // Create new chatbox. timeElapse is default to be Date.now(), so that it is obtional parameter
// await cr.addChatBox(cb);                                     // Save chatbox to chatroom in database
// cb = new Chatbox(user2Id, 'Hi');
// await cr.addChatBox(cb);

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

    async saveAsGroupChatroom() {
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

    async saveAsFriendChatroom() {
        const db = getDatabase();
        await db.collection('chatroom').insertOne(this).then(result => {this._id = result.insertedId});

        var userId;
        for (let i = 0; i < this.users.length; i++) {
            userId = this.users[i];
            // UserChatrooms.addRoom(user, this._id);
            await db.collection('user-chatrooms').updateOne( { _id: ObjectID(userId) },
                                                             { $push: { 'friendChatroom': this._id} },
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