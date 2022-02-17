const getDatabase = require('../util/database').getDatabase;

class User {
    static findAllAsync = async () => {
        const db = getDatabase();
        const result = await db.collection('user').find();
        return result.toArray();
    }

    static findByEmail = async (email) => {
        const db = getDatabase();
        return await db
            .collection('user')
            .find({ email: email })
            .next()
            .then(data => {
                const user = new User(data.email, data.name);
                user.id = data._id
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
        return db.collection('user').updateOne( { _id: this._id },
                                                { $set: this },
                                                { upsert: false })
    }
}

module.exports = User;