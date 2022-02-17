const getDatabase = require('../util/database').getDatabase;
const User = require('../models/user')
const EmailSender = require('../util/emailSender')
const crypto = require("crypto");

const emailSender = new EmailSender("http://localhost:8080/user/activate?m=%email%&id=%id%")
const pendingAccount = {};
const pendingLogin = {};

exports.createNewAccount = async (req, res, next) => {
    const email = req.body.email
    const name = req.body.name

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
    pendingAccount[email] = { 'email': email, 'name': name, 'activateId': activateId };

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

exports.login = async (req, res, next) => {
    const email = req.body.email

    // Check login session
    const loginSession = req.session.verification;
    if (loginSession) 
        if (loginSession.email == email && loginSession.verified) {
            res.write(JSON.stringify({
                "success": true,
                "message": "You already login",
                "user": { 'id': loginSession.id, 'email': email, 'name': loginSession.name }
            }, null, "\t"));
            res.end();
            return;
        }

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