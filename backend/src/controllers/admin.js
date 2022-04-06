const getDatabase = require('../util/database').getDatabase;
const mongoConnect = require('../util/database').mongoConnect;
const Admin = require('../models/admin')
const User = require('../models/user')


const crypto = require("crypto");
const path = require("path");
const { Console } = require('console');

const pendingAccount = {};
const pendingLogin = {};



exports.adminLogin = async (req, res, next) => {

    var id = req.body.id;
    var password = req.body.pw;
    var admin;
    try {
        admin = await Admin.findByIdAndPassword(id, password);
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Incorrect email or password in admin"
        }, null, "\t"));
        res.end();
        console.log(e)
        return;
    }

    req.session.adminVerification = {
        'id': id,
        'verified': true
    };

    res.write(JSON.stringify({
        "success": true,
        'admin': admin
    }, null, "\t"));
    res.end();
    return;
}

function adminIsVerified(req, res) {
    const loginSession = req.session.adminVerification;
    if (loginSession && loginSession.verified) return true

    res.write(JSON.stringify({
        "success": false,
        "message": "Please login"
    }, null, "\t"));
    res.end();
    return false;
}

exports.adminChangePassword = async (req, res, next) => {
    if (!adminIsVerified(req, res)) return

    var id = req.session.adminVerification.id
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var admin;
    /////////////////////////////
    try {
        admin = await Admin.adminChangePassword(id, oldPassword, newPassword);

    } catch {
        res.write(JSON.stringify({
            "success": false,
            "message": "Wrong current password.",
        }, null, "\t"));
        res.end();
        return;
    }

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();

    // console.log(admin);

    // if((admin._id==id)&&(admin.password==newPassword)){
    //     res.write(JSON.stringify({
    //     "success": true,
    //     "user": Admin,
    //     "message": "Successfully change password"
    //     }, null, "\t"));
    //     res.end();
    //     return;
    // } else{
    //     res.write(JSON.stringify({
    //         "success": false,
    //         "message": "Can't change password"
    //         }, null, "\t"));
    //         res.end();
    //         return;
    // }

}

exports.adminBlockUser = async (req, res, next) => {

    //check reqsession
    if (!adminIsVerified(req, res)) return;

    //the following id is userid(want to block that one)
    var id = req.body.id;
    // var admin;
    try {
        // admin = await Admin.add_Blocklist(id);
        await User.changeStatus(id, 'block');
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Fail to block!",
        }, null, "\t"));
        res.end();
        console.log(e);
        return;
    }

    res.write(JSON.stringify({
        "success": true,
        "message": "User is blocked!",
    }, null, "\t"));
    res.end();
    return;


}

exports.adminUnblockUser = async (req, res, next) => {
    //check reqsession
    if (!adminIsVerified(req, res)) return;

    //the following id is userid(want to unblock that one)
    var id = req.body.id;
    // var admin;
    try {
        // admin = await Admin.remove_Blocklist(id);
        await User.changeStatus(id, 'active');
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Fail to unblock!",
        }, null, "\t"));
        res.end();
        console.log(e);
        return;
    }

    res.write(JSON.stringify({
        "success": true,
        "message": "User is unblock!",
    }, null, "\t"));
    res.end();
    return;


}

exports.adminGetUserById = async (req, res, next) => {
    // if (!adminIsVerified(req, res)) return;

    //the following is get user by id 
    var id = req.body.id;
    var user;
    try {
        user = await Admin.AdminShowUserById(id)
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Fail in get user by id",
        }, null, "\t"));
        res.end();
        console.log(e);
        return;
    }

    res.write(JSON.stringify({
        "success": true,
        "message": "Success in get user by id",
        "user": user
    }, null, "\t"));
    res.end();
    
}

exports.adminGetAllUser = async(req, res) => {
    //if (!adminIsVerified(req, res)) return;
    
    var userList;
    try {
       userList = await User.findAllAsync();
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Fail to get users information.",
        }, null, "\t"));
        res.end();
        console.log(e);
        return;
    }

    res.write(JSON.stringify({
        "success": true,
        "userList": userList
    }, null, "\t"));
    res.end();
}

exports.adminDeleteAccount = (req, res) => {
    if (!adminIsVerified(req, res)) return;

    //the following the user id
    var id = req.body.id;
    var admin;
    console.log(id);
    try {
        admin = Admin.AdminDelete(id);

    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Fail in delete!",
        }, null, "\t"));
        res.end();
        console.log(e);
        return;
    }
    //console.log(admin);
    res.write(JSON.stringify({
        "success": true,
        "message": "success in delete!"
    }, null, "\t"));
    res.end();

}

exports.setUserPassword = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    // Get user information
    var user;
    try {
        user = await User.findByEmail(email, 'login')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Account is not exist. "
        }, null, "\t"));
        res.end();
        return;
    }
    
    // Update session
    user.password = password;
    user.updatePassword();

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();
}