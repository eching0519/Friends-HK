const { ObjectID } = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

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
        //const db = getDatabase();
        let return_value;
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority'
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        try {

            const db = client.db("CSCI3100Project");
            let collection = db.collection('admin');
            let query = {}
            let res = await collection.findOne(query);
            //console.log(res);
            return_value = res;

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            return return_value;
        }

        /*return await db
            .collection('admin')
            .find({ '_id': id, 'password': password })
            .next()
            .then(data => {
                //console.log(data);
                return data
            })
            .catch(err => {
                throw err; 
            });*/
        //const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority';
        /* MongoClient.connect(url, function(err, db) {
             if (err) throw err;
             var dbo = db.db("CSCI3100Project");
             dbo.collection("admin").findOne({}, function(err, result) {
                 if (err) throw err;
                 console.log(result.name);
                 console.log(result._id);
                 console.log(result.password);
                 return_value= result;                                 
                 db.close();                   
                return return_value;
               
             });
           });*/


    }

    //for change pasword
    static adminChangePassword = async (id, oldPassword_, newPassword_) => {

        let return_value;
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority'
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        try {

            const db = client.db("CSCI3100Project");
            let collection = db.collection('admin');
            let query = {}
            let res = await collection.findOne({
                where: {
                    _id: id,
                }
            });

            if ((res != null) && (res.password == oldPassword_)) {
                let res1 = await collection.updateOne(
                    { '_id': id },
                    { $set: { 'password': newPassword_ } },
                )
                //for testing result
                return_value = await collection.findOne({
                    where: {
                        _id: id,
                    }
                });
            }

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            return return_value;
        }
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
        return db.collection('admin').updateOne({ _id: this.id },
            { $set: this },
            { upsert: false })
    }

    static updatePassword(id, password) {
        const db = getDatabase();
        return db.collection('admin').updateOne({ _id: id },
            {
                $set: {
                    'password': password
                }
            },
            { upsert: false })
    }


    // add user in to blocklist
    static add_Blocklist = async (id) => {

        let return_value;
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority'
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        try {

            const db = client.db("CSCI3100Project");
            let collection = db.collection('user');
            let query = {}
            let res = await collection.updateOne(
                { '_id': id },
                { $set: { 'block': "True" } },

            );

            return_value = res;

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            return return_value;
        }
    }



    //remove user from the blocklist
    remove_Blocklist = async (id) => {

        let return_value;
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb+srv://1155148699:hcdD0iGk6ZiLefr7@cityplanner.r2ndl.mongodb.net/CSCI3100Project?retryWrites=true&w=majority'
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }

        try {

            const db = client.db("CSCI3100Project");
            let collection = db.collection('user');
            let query = {}
            let res = await collection.updateOne(
                { '_id': id },
                { $set: { 'block': "False" } },

            );

            return_value = res;

        } catch (err) {

            console.log(err);
        } finally {

            client.close();
            return return_value;
        }

    }

    //this is used to show all data for admin
    static AdminShowAllUser = async()=>{

    }

    //this is used to show data for specified id for admin
    static AdminShowUserById = async(id)=>{

    }


}

module.exports = Admin;