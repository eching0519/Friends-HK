const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;
const User = require('./user');

class Friend {

    static findById = async (id1, id2) =>{
        const db = getDatabase();
        return await db
            .collection('friendRequest')
            .find({'to': id1, 'from': id2})
            .next()
            .then(data=>{
                const friend = new Friend(data.to, data.from)
                friend.status = data.status
                friend.id= data._id
                return friend;
            })
            .catch(err=>{
                throw err;
            });
    }

    static findByRequestId = async (id) =>{
        const db = getDatabase();
        return await db
            .collection('friendRequest')
            .find({_id: ObjectID(id)})
            .next()
            .then(data=>{
                const friend = new Friend(data.to, data.from)
                friend.status = data.status
                friend.id= data._id
                return friend;
            })
            .catch(err=>{
                throw err;
            });
    }

    static findFriendRequestsOfUser = async (id) =>{
        const db = getDatabase();
        let incomingRequest = await db
                                .collection('friendRequest')
                                .find({to: id, status: 'pending'}).toArray();

        let fromId;
        let from;
        for (let i = 0 ; i < incomingRequest.length; i++) {
            fromId = incomingRequest[i].from;
            from = await User.findById(fromId);
            incomingRequest[i].from = from;
        }

        let outgoingRequest = await db
                                .collection('friendRequest')
                                .find({from: id, status: 'pending'}).toArray();
        let toId;
        let to;
        for (let i = 0 ; i < outgoingRequest.length; i++) {
            toId = outgoingRequest[i].to;
            to = await User.findById(toId);
            outgoingRequest[i].to = to;
        }

        return {'incoming': incomingRequest, 'outgoing': outgoingRequest};
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

    async acceptRequest() {
        const db = getDatabase();
        return await db.collection('friendRequest').updateOne( { _id: this.id },
                                                { $set: {
                                                    'status': 'accept'
                                                } },
                                                { upsert: false })
    }

    async deleteRequest() {
        const db = getDatabase();
        return await db.collection('friendRequest').deleteOne( { _id: this.id },
                                                    { upsert: false })
    }

}

module.exports = Friend;

