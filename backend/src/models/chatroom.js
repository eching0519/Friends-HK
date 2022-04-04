const { ObjectID } = require('mongodb');

const getDatabase = require('../util/database').getDatabase;

class Chatroom {
    
    constructor(users) {
        this.id = null;
        this.name = users.toString();
        this.users = users
        this.history = []
    }

    async create() {
        const db = getDatabase();
        return db.collection('chatroom').insertOne(this).then(result => {this.id = result.insertedId});
    }
}

let cr = new Chatroom(['a', 'b']);
cr.create()
console.log(cr)
