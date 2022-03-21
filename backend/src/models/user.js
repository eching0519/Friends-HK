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
                        user.status = data.status;
                        user.preferences = data.preferences;
                        user.picture = data.picture;
                        return user;

                    default:
                        let myData = JSON.parse(JSON.stringify(data));
                        console.log(myData)
                        delete myData[password];
                        return myData;
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
                        user.status = data.status;
                        user.preferences = data.preferences;
                        user.picture = data.picture;
                        return user;
                    default:
                        let myData = JSON.parse(JSON.stringify(data));
                        delete myData[password];
                        return myData;
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
                user.status = data.status;
                user.preferences = data.preferences;
                user.picture = data.picture;
                return user;
            })
            .catch(err => {
                throw err; 
            });
    }

    static findByIdAndPassword = async (id, password) => {
        const db = getDatabase();
        return await db
            .collection('user')
            .find({ '_id': ObjectID(id), 'password': password })
            .next()
            .then(data => {
                const user = new User(data.email, data.name);
                user.id = data._id;
                user.status = data.status;
                user.preferences = data.preferences;
                user.picture = data.picture;
                return user;
            })
            .catch(err => {
                throw err; 
            });
    }

    constructor(email, name) {
        this.email = email;
        this.name = name;
        // for personal self introduction
        // example:
        // reputation
        // interest
        // age....

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

    updateName() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $set: {
                                                    'name': this.name
                                                } },
                                                { upsert: false })
    }

    updatePassword() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $set: {
                                                    'password': this.password
                                                } },
                                                { upsert: false })
    }


    //get the list of blocklist
    //for compare , if block=>can't login
    //else, can log in
    getBlocklist(id){
        
    } 

}

module.exports = User;