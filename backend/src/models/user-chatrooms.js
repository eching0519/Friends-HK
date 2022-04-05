const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class UserChatrooms {
    // static findAllAsync = async () => {
    //     const db = getDatabase();
    //     const result = await db.collection('user').find();
    //     return result.toArray();
    // }

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