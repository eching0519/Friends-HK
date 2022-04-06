const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;
const Chatroom = require('./chatroom')

class UserChatrooms {
    static findAllChatroomsByUserId = async (id) => {
        const db = getDatabase();
        var chatroomList = [];
        var chatroom;
        return await db.collection('user-chatrooms')
                        .find({ '_id': ObjectID(id) })
                        .next()
                        .then(async (data) => {

                            for (let i = 0; i < data.chatroom.length; i++) {
                                chatroom = await Chatroom.findById(data.chatroom[i])
                                chatroomList.push(chatroom);
                            }
                            return chatroomList;
                        })
                        .catch(err => {
                            throw err;
                        });

        
    }

    constructor(user) {
        this._id = user._id;
        this.chatroom = []
    }

    async create() {
        const db = getDatabase();
        return db.collection('user-chatrooms').insertOne(this);
    }

    static async addRoom(userId, chatroomId) {
        let db = getDatabase();
        if (typeof(userId) === 'string') {
            userId = ObjectID(userId)
        }
        return db.collection('user-chatrooms').updateOne( { _id: userId },
                                                          { $push: { chatroom: chatroomId} },
                                                          { upsert: false })
    }

}

module.exports = UserChatrooms;