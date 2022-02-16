const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority'

let _db;

const mongoConnect = callback => {
    MongoClient.connect(url)
                .then(client => {
                    console.log('Connected')
                    _db = client.db()
                    callback()
                })
                .catch(err => {
                    console.log(err)
                    throw err
                })
}

const getDatabase = () => {
    if (_db) {
        return _db
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDatabase = getDatabase