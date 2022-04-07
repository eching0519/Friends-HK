const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class Friend {

    static findById = async (id1, id2) =>{
        const db = getDatabase();
        return await db
            .collection('friendRequest')
            .find({'to': id1, 'from': id2})
            .next()
            .then(data=>{
                const friend = new Friend(data.from, data.to)
                friend.status = data.status
                friend.id= data._id
                return friend;
            })
            .catch(err=>{
                throw err;
            });
    }

    constructor(to, from, status) {
        this.to = to;
        this.from = from;
        this.status = status;
    }

    async create() {
        const db = getDatabase();
        return db.collection('friendRequest').insertOne(this);
    }

    rejectRequest() {
        const db = getDatabase();
        return db.collection('friendRequest').updateOne( { _id: this.id },
                                                { $set: {
                                                    'status': 'reject'
                                                } },
                                                { upsert: false })
    }

    acceptRequest() {
        const db = getDatabase();
        return db.collection('friendRequest').updateOne( { _id: this.id },
                                                { $set: {
                                                    'status': 'accept'
                                                } },
                                                { upsert: false })
    }

    deleteRequest() {
        const db = getDatabase();
        return db.collection('friendRequest').deleteOne( { _id: this.id },
                                                { upsert: false })
    }








}

module.exports = Friend;

