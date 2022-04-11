const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class User {
    static findAllAsync = async () => {
        const db = getDatabase();
        let result = await db.collection('user').find();
        result = await result.toArray();
        await result.forEach(x => delete x['password']);
        return result;
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
                        user._id = data._id;
                        user.status = data.status;
                        user.preferences = data.preferences;
                        user.picture = data.picture;
                        if (data.lang != null) user.lang = data.lang;
                        if (data.co != null) user.co = data.co;
                        if (data.dob != null) user.dob = data.dob;
                        if (data.hobbies != null) user.hobbies = data.hobbies;
                        if (data.bio != null) user.bio = data.bio;
                        if (data.hashtags != null) user.hashtags = data.hashtags;
                        if (data.preferences != null) user.preferences = data.preferences;
                        if (data.friendlist != null) user.friendlist = data.friendlist;
                        return user;

                    default:
                        let myData = JSON.parse(JSON.stringify(data));
                        delete myData.password;
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
                        user._id = data._id;
                        user.status = data.status;
                        user.preferences = data.preferences;
                        user.picture = data.picture;
                        if (data.lang != null) user.lang = data.lang;
                        if (data.co != null) user.co = data.co;
                        if (data.dob != null) user.dob = data.dob;
                        if (data.hobbies != null) user.hobbies = data.hobbies;
                        if (data.bio != null) user.bio = data.bio;
                        if (data.hashtags != null) user.hashtags = data.hashtags;
                        if (data.preferences != null) user.preferences = data.preferences;
                        if (data.friendlist != null) user.friendlist = data.friendlist;
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
                user._id = data._id;
                user.status = data.status;
                user.preferences = data.preferences;
                user.picture = data.picture;
                if (data.lang != null) user.lang = data.lang;
                if (data.co != null) user.co = data.co;
                if (data.dob != null) user.dob = data.dob;
                if (data.hobbies != null) user.hobbies = data.hobbies;
                if (data.bio != null) user.bio = data.bio;
                if (data.hashtags != null) user.hashtags = data.hashtags;
                if (data.preferences != null) user.preferences = data.preferences;
                if (data.friendlist != null) user.friendlist = data.friendlist;
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
                user._id = data._id;
                user.status = data.status;
                user.picture = data.picture;
                if (data.lang != null) user.lang = data.lang;
                if (data.co != null) user.co = data.co;
                if (data.dob != null) user.dob = data.dob;
                if (data.hobbies != null) user.hobbies = data.hobbies;
                if (data.bio != null) user.bio = data.bio;
                if (data.hashtags != null) user.hashtags = data.hashtags;
                if (data.preferences != null) user.preferences = data.preferences;
                if (data.friendlist != null) user.friendlist = data.friendlist;
                return user;
            })
            .catch(err => {
                throw err; 
            });
    }

    static changeStatus(id, status) {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: ObjectID(id) },
                                                { $set: {
                                                    'status': status
                                                } },
                                                { upsert: false })
    }

    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.status = 'active';
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

    updateFriendlist() {
        const db = getDatabase();
        return db.collection('user').updateOne( { _id: this.id },
                                                { $push: {
                                                    'friendlist': this.friendlist
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