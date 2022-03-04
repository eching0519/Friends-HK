const getDatabase = require('../util/database').getDatabase;
const User = require('../models/user')
const EmailSender = require('../util/emailSender')
const crypto = require("crypto");
const path = require("path");
const { type } = require('os');

const emailSender = new EmailSender("http://localhost:8080/user/activate?m=%email%&id=%id%")
const pendingAccount = {};
const pendingLogin = {};

exports.createNewAccount = async (req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    var user;
    try {
        user = await User.findByEmail(email, 'login')
    } catch(e) {
    }

    if (user) {
        res.write(JSON.stringify({
            "success": false,
            "message": "This email is already in use."
        }, null, "\t"));
        res.end();
        return
    }

    const activateId = crypto.randomBytes(20).toString('hex');
    pendingAccount[email] = { 'email': email, 'name': name, 'password': password, 'activateId': activateId };

    // Set expire
    setTimeout((email, id) => {
        if (!(email in pendingAccount)) return;
        if (pendingAccount[email].activateId == id)
            delete pendingAccount[email]
    }, 15 * 60 * 1000, email, activateId);

    emailSender.sendAccountActivation(email, name, activateId, function(error, info) {
        if (error) 
            console.log(error);
        else       
            console.log(info.response);
    });

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();

    console.log('email', email);
    console.log('activateId', activateId);
}

exports.activateAccount = async (req, res, next) => {
    const email = req.query.m
    const activateId = req.query.id

    if (!(email in pendingAccount) || pendingAccount[email].activateId != activateId) {
        res.write(JSON.stringify({
            "success": false,
            "message": "This activation has expired."
        }, null, "\t"));
        res.end();
        return
    }

    const user = new User(pendingAccount[email].email, pendingAccount[email].name);
    user.password = pendingAccount[email].password
    user.status = 'active'
    delete pendingAccount[email];

    try {
        await user.create();
    } catch (e) {
        res.write(JSON.stringify(e, null, "\t"))
        res.end()
        return
    }

    res.write(JSON.stringify({
        "success": true,
        "message": "Your account is activated."
    }, null, "\t"));
    res.end()
}

function alreadyLogin(req, res, email) {
    const loginSession = req.session.verification;
    if (loginSession) 
        if (loginSession.email == email && loginSession.verified) {
            res.write(JSON.stringify({
                "success": true,
                "message": "You already login",
                "user": { 'id': loginSession.id, 'email': email, 'name': loginSession.name }
            }, null, "\t"));
            res.end();
            return true;
        }

    return false;
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (alreadyLogin(req, res, email)) return

    var user;
    try {
        user = await User.findByEmailAndPassword(email, password)
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Incorrect email or password."
        }, null, "\t"));
        res.end();
        return;
    }

    if (user.status != 'active') {
        res.write(JSON.stringify({
            "success": false,
            "message": "Your account status is '" + user.status + "'. Contact us for more information."
        }, null, "\t"));
        res.end();
        return;
    }

    // Update session
    req.session.verification = {
        'id': user.id,
        'email': email,
        'name': user.name,
        'verified': true
    };

    res.write(JSON.stringify({
        "success": true,
        "user": user
    }, null, "\t"));
    res.end();
}

exports.loginByEmail = async (req, res, next) => {
    const email = req.body.email

    // Check login session
    if (alreadyLogin(req, res, email)) return

    var user;
    try {
        user = await User.findByEmail(email, 'login')
    } catch {
        res.write(JSON.stringify({
            "success": false,
            "message": "Account is not exist."
        }, null, "\t"));
        res.end();
        return
    }

    if (user.status != 'active') {
        res.write(JSON.stringify({
            "success": false,
            "message": "Your account status is '" + user.status + "'. Contact us for more information."
        }, null, "\t"));
        res.end();
        return;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    pendingLogin[email] = { 'email': email, 'code': verificationCode };

    // Set expire
    setTimeout((email, verificationCode) => {
        if (!(email in pendingLogin)) return;
        if (pendingLogin[email].code == verificationCode)
            delete pendingLogin[email]
    }, 5 * 60 * 1000, email, verificationCode);

    emailSender.sendLoginVerification(email, verificationCode, function(error, info) {
        if (error) {
            res.write(JSON.stringify({
                "success": false,
                "message": "Unknown error. Please try again later."
            }, null, "\t"));
            res.end();
            console.log(error);
            return;
        } else       
            console.log(info.response);
    });

    // Add session
    req.session.verification = {
        'email': email,
        'verified': false
    };

    res.write(JSON.stringify({
        "success": true,
        "message": "Email is sent"
    }, null, "\t"));
    res.end();

    console.log('verificationCode', verificationCode);
}

exports.loginVerify = async (req, res, next) => {
    const loginSession = req.session.verification;
    if (!loginSession) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Session is not exist. Please login again."
        }, null, "\t"));
        res.end();
        return;
    }

    const email = loginSession.email
    const code = req.body.code

    if (!(email in pendingLogin)) {
        res.write(JSON.stringify({
            "success": false,
            "message": "The verification code is expired."
        }, null, "\t"));
        res.end();
        return;
    }

    if (code !== pendingLogin[email].code) {
        res.write(JSON.stringify({
            "success": false,
            "message": "The verification code is incorrect."
        }, null, "\t"));
        res.end();
        console.log(pendingLogin[email].code)
        return;
    }
    delete pendingLogin[email]

    // Get user information
    var user;
    try {
        user = await User.findByEmail(email, 'login')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error. Please try again later. " + e.message
        }, null, "\t"));
        res.end();
        console.log(pendingLogin[email].code)
        return;
    }
    
    // Update session
    req.session.verification = {
        'id': user.id,
        'email': email,
        'name': user.name,
        'verified': true
    };

    res.write(JSON.stringify({
        "success": true,
        "user": user
    }, null, "\t"));
    res.end();
}

exports.logout = (req, res, next) => {
    const loginSession = req.session.verification;
    if (loginSession) 
        delete req.session.verification

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();
}

function userIsVerified(req, res) {
    const loginSession = req.session.verification;
    if (loginSession)   return true

    res.write(JSON.stringify({
        "success": false,
        "message": "Please login"
    }, null, "\t"));
    res.end();
    return false;
}

exports.getUserInfo = async (req, res, next) => {
    var id = req.query.id
    var user;

    if (id == null) {
        if (!userIsVerified(req, res)) return
        id = req.session.verification.id
    }

    try {
        user = await User.findById(id, 'query')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error. " + e.message
        }, null, "\t"));
        res.end();
        return;
    }

    // Remove password before response
    delete user.password

    res.write(JSON.stringify({
        "success": true,
        "user": user
    }, null, "\t"));
    res.end();
    return;
}

exports.updateProfilePicture = async (req, res, next) => {
    console.log(req.file)
    const picUrl = "http://localhost:8080/user/profile/picture/" + req.file.filename

    if (!userIsVerified(req, res)) return

    const id = req.session.verification.id  // User Id
    var user;
    try {
        user = await User.findById(id, 'update')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error."
        }, null, "\t"));
        res.end();
        return;
    }

    user.picture = picUrl
    user.updateProfilePicture()

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();
}

exports.updatePreferences = async (req, res, next) => {
    if (!userIsVerified(req, res)) return

    const id = req.session.verification.id  // User Id
    var user;
    try {
        user = await User.findById(id, 'update')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error."
        }, null, "\t"));
        res.end();
        return;
    }
    // Please update value in user.preferences
    // ...
    // console.log(typeof(req.body.language));
    // console.log(req.body.language);
    const language = new Array(req.body.language);
    const hobbies = new Array(req.body.hobbies);
    user.preferences = language.concat(hobbies);
    user.updatePreferences();
    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();
}

exports.updateProfile = async (req, res, next) => {
    if (!userIsVerified(req, res)) return

    const id = req.session.verification.id  // User Id
    var user;
    try {
        user = await User.findById(id, 'update')
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Unknown error."
        }, null, "\t"));
        res.end();
        return;
    }

    // Password, Name...
    const newName = req.body.name;
    const newPassword = req.body.password;
    if (newName!=""){
        user.name = newName;
        user.updateName();
        res.write(JSON.stringify({
            "success": true
        }, null, "\t"));
        res.end();
        console.log("update name");
    }

    if (newPassword!=""){
        user.password = newPassword;
        user.updatePassword();
        res.write(JSON.stringify({
            "success": true
        }, null, "\t"));
        res.end();
        console.log("update password");
    }


    
}