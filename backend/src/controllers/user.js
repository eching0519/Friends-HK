const getDatabase = require('../util/database').getDatabase;
const User = require('../models/user')

exports.findUserById = async (username) => {
    const db = getDatabase();
    return db
        .collection('user')
        .find({ _id: username })
        .next()
        .then(userData => {
            // const user = new User(userData._id)
            // user.name = userData.name
            // user.coin = userData.coin
            // return user;
        })
        .catch(err => {
            throw err; 
        });
}

exports.createNewUser = async (req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password

    const user = new User(email, name, username, password)

    const db = getDatabase()

    try {
        await db.collection('user').insertOne(user)
    } catch (e) {
        res.write(JSON.stringify(e, null, "\t"))
        res.end()
        return
    }
    res.end()
    return
}

exports.login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    const db = getDatabase()
    try {
        await db.collection('user')
                .find({ _id: username, password: password })
    } catch (e) {
        res.write(JSON.stringify(e, null, "\t"))
        res.end()
        return
    }
    res.end()
    return
}