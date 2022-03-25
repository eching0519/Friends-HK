const getDatabase = require('../util/database').getDatabase;
const User = require('../models/user')
const Friend = require('../models/friend')
const EmailSender = require('../util/emailSender')
const crypto = require("crypto");
const path = require("path");
const { type } = require('os');



exports.SendFriendRequest = async (req, res, next) =>{
    const to = req.body.to
    const from = req.body.from
    const status = 'pending'

    const friend = new Friend(to, from, status);

    var user_to, user_from;

    try {
        user_to = await User.findById(to, 'query')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "No such user."
        }, null, "\t"));
        res.end();
        return;
    }
    user_from = await User.findById(from, 'query')
    friendlist = user_from.friendlist
    for(let i=0;i <friendlist.length; i++){
        if (friendlist[i]==to){
            res.write(JSON.stringify({
                "success": false,
                "message": "Already in friendlist."
            }, null, "\t"));
            res.end();
            return;

        }
    }

    var request;
    try {
        request = await await Friend.findById(to, from)
    } catch(e) {
    }

    if (request) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Request is pending."
        }, null, "\t"));
        res.end();
        return
    }


    try {
        await friend.create();
    } catch (e) {
        res.write(JSON.stringify(e, null, "\t"))
        res.end()
        return
    }

    res.write(JSON.stringify({
        "success": true,
        "message": "Friend request sent."
    }, null, "\t"));
    res.end()

}

exports.RejectRequest = async(req, res, next)=>{
    const to = req.body.to
    const from = req.body.from
    var friend;
    try {
        friend = await Friend.findById(to, from)
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "No such record."
        }, null, "\t"));
        res.end();
        return;
    }

    currentStatus = friend.status

    friend.deleteRequest();
    res.write(JSON.stringify({
        "success": true,
        "message": "Request rejected"
    }, null, "\t"));
    res.end();


}

exports.AcceptRequest = async(req, res, next)=>{
    const to = req.body.to
    const from = req.body.from
    var friend;
    try {
        friend = await Friend.findById(to, from)
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "No such record."
        }, null, "\t"));
        res.end();
        return;
    }
    var user1, user2;
    // Update user1
    try {
        user1 = await User.findById(to, 'update')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error."
        }, null, "\t"));
        res.end();
        return;
    }
    const friendlist1=  new Array(user1.friendlist);
    user1.friendlist = from
    user1.updateFriendlist();
    // res.write(JSON.stringify({
    //     "success": true,
    //     "message": "user1 list updated"
    // }, null, "\t"));
    // res.end();

    // Update user2
    try {
        user2 = await User.findById(from, 'update')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error."
        }, null, "\t"));
        res.end();
        return;
    }
    const friendlist2=  new Array(user2.friendlist);
    user2.friendlist = to
    user2.updateFriendlist();
    // res.write(JSON.stringify({
    //     "success": true,
    //     "message": "user2 list updated"
    // }, null, "\t"));
    // res.end();

    friend.acceptRequest();
    res.write(JSON.stringify({
        "success": true,
        "message": "Request accepted"
    }, null, "\t"));
    res.end();


}