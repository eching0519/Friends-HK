const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class Admin {

    static findById = async (id) => {
        const db = getDatabase();
        return await db
            .collection('admin')
            .find({ '_id': ObjectID(id) })
            .next()
            .then(data => {
                return data;
                
            })
            .catch(err => {
                throw err; 
            });
    }
    //problem still return null for finding admin
    static findByIdAndPassword = async (id, password) => {
        const db = getDatabase();
        return await db
            .collection('admin')
            .find({ '_id': id, 'password': password })
            .next()
            .then(data => {
                return data
            })
            .catch(err => {
                throw err; 
            });
    }

    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    async create() {
        const db = getDatabase();
        return db.collection('admin').insertOne(this);
    }

    update() {
        const db = getDatabase();
        return db.collection('admin').updateOne( { _id: this.id },
                                                { $set: this },
                                                { upsert: false })
    }

    static updatePassword(id, password) {
        const db = getDatabase();
        return db.collection('admin').updateOne( { _id: id },
                                                { $set: {
                                                    'password': password
                                                } },
                                                { upsert: false })
    }
}

module.exports = Admin;