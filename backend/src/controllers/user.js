const getDatabase = require('../util/database').getDatabase;
const User = require('../models/user')
const EmailSender = require('../util/emailSender')
const crypto = require("crypto");
const path = require("path");
const { type } = require('os');

const emailSender = new EmailSender("http://localhost:3000/verify?m=%email%&id=%id%")
const pendingAccount = {};
const pendingLogin = {};
const pendingResetPassword = {};

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
            var user = User.findById(loginSession.id)

            res.write(JSON.stringify({
                "success": true,
                "message": "You already login",
                "user": user
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
    user.verified = true
    req.session.verification = user;

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
        console.log("The verification code is incorrect." + pendingLogin[email].code)
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
        console.log("Unknown error."+pendingLogin[email].code)
        return;
    }
    
    // Update session
    user.verified = true
    req.session.verification = user;

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

exports.forgotPasswordEmail = async (req, res, next) => {
    const email = req.body.email

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
    pendingResetPassword[email] = { 'email': email, 'code': verificationCode };

    // Set expire
    setTimeout((email, verificationCode) => {
        if (!(email in pendingResetPassword)) return;
        if (pendingResetPassword[email].code == verificationCode)
            delete pendingResetPassword[email]
    }, 5 * 60 * 1000, email, verificationCode);

    emailSender.sendForgotPassword(email, verificationCode, function(error, info) {
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

exports.resetForgottenPassword = async (req, res, next) => {
    const email = req.body.email
    const code = req.body.code
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

    if (!(email in pendingResetPassword)) {
        res.write(JSON.stringify({
            "success": false,
            "message": "The verification code is expired."
        }, null, "\t"));
        res.end();
        return;
    }

    if (code !== pendingResetPassword[email].code) {
        res.write(JSON.stringify({
            "success": false,
            "message": "The verification code is incorrect."
        }, null, "\t"));
        res.end();
        console.log("The verification code is incorrect." + pendingResetPassword[email].code)
        return;
    }
    delete pendingResetPassword[email]
    
    // Update session
    user.password = password;
    user.updatePassword();

    res.write(JSON.stringify({
        "success": true
    }, null, "\t"));
    res.end();
}

function userIsVerified(req, res) {
    const loginSession = req.session.verification;
    if (loginSession && loginSession.verified)   return true

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
        "success": true,
        "user": user
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

    if (req.body.lang != '')
        user.lang = req.body.lang;
    if (req.body.co != '')
        user.co = req.body.co;
    if (req.body.gender != '')
        user.gender = req.body.gender;
    if (req.body.dob != '')
        user.dob = req.body.dob;
    if (req.body.hobbies != '')
        user.hobbies = (typeof(req.body.hobbies) === 'string')? [req.body.hobbies]: req.body.hobbies;
    if (req.body.bio != '')
        user.bio = req.body.bio;
    if (req.body.hashtags != '')
        user.hashtags = (typeof(req.body.hashtags) === 'string')? [req.body.hashtags]: req.body.hashtags;

    user.preferences = {
        lang: (typeof(req.body.plang) === 'string')? [req.body.plang]: req.body.plang,
        gender: (typeof(req.body.pgender) === 'string')? [req.body.pgender]: req.body.pgender,
        ageFrom: req.body.ageFrom,
        ageTo: req.body.ageTo
    }

    user.update()

    res.write(JSON.stringify({
        "success": true,
        "user": user
    }, null, "\t"));
    res.end();
}

exports.updateProfile = async (req, res, next) => {
    if (!userIsVerified(req, res)) return

    const id = req.session.verification.id;  // User Id
    const newName = req.body.name;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    var user;
    try {
        user = await User.findByIdAndPassword(id, password)
    } catch (e) {
        res.write(JSON.stringify({
            "success": false,
            "message": "Invalid password."
        }, null, "\t"));
        res.end();
        return;
    }

    // Password, Name...
    if (newName!=""){
        user.name = newName;
    }

    if (newPassword!=""){
        user.password = newPassword;
    }

    user.update()

    res.write(JSON.stringify({
        "success": true,
        "user": user
    }, null, "\t"));
    res.end();
}