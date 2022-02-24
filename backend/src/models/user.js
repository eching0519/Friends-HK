const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class User {
    static findAllAsync = async () => {
        const db = getDatabase();
        const result = await db.collection('user').find();
        return result.toArray();
    }

    static findById = async (id, usage) => {
        const db = getDatabase();
        return await db
            .collection('user')
            .find({ '_id': ObjectID(id) })
            .next()
            .then(data => {
                switch (usage) {
                    case 'update':
                        var user = new User(data.email, data.name);
                        user.id = data._id;
                        user.preferences = data.preferences
                        return user;
                    case 'query':
                        return data;

                    default:
                        return data;
                }
                
            })
            .catch(err => {
                throw err; 
            });
    }

    static findByEmail = async (email, usage) => {
        const db = getDatabase();
        return await db
            .collection('user')
            .find({ email: email })
            .next()
            .then(data => {
                switch (usage) {
                    case 'register', 'login':
                        var user = new User(data.email, data.name);
                        user.id = data._id;
                        return user;
                    case 'all':
                        var user = new User(data.email, data.name);
                        user.id = data._id;
                        user.preferences = data.preferences
                        return user;
                    default:
                        return data;
                }
            })
            .catch(err => {
                throw err; 
            });
    }

    static findByEmailAndPassword = async (email, password) => {
        const db = getDatabase();
        return await db
            .collection('user')
            .find({ 'email': email, 'password': password })
            .next()
            .then(data => {
                const user = new User(data.email, data.name);
                user.id = data._id;
                return user;
            })
            .catch(err => {
                throw err; 
            });
    }

    constructor(email, name) {
        this.email = email;
        this.name = name;
    }

    async create() {
        const db = getDatabase();
        return db.collection('user').insertOne(this).then(result => {this.id = result.insertedId});
    }

    update() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $set: this },
                                                { upsert: false })
    }

    updatePreferences() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $set: {
                                                    'preferences': this.preferences
                                                } },
                                                { upsert: false })
    }

    updateProfilePicture() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $set: {
                                                    'picture': this.picture
                                                } },
                                                { upsert: false })
    }
}

module.exports = User;