const getDatabase = require('../util/database').getDatabase;
const mongoConnect=require('../util/database').mongoConnect;
const Admin = require('../models/admin')
const User=require('../models/user')


const crypto = require("crypto");
const path = require("path")

const pendingAccount = {};
const pendingLogin = {};



exports.adminLogin=async(req,res,next)=>{

    var id = req.body.id;
    var password = req.body.password;
    var admin;
    try{
        admin = await Admin.findByIdAndPassword(id,password);
        
    } catch{
        res.write(JSON.stringify({
            "success": false,
            "message": "Incorrect email or password in admin"
        }, null, "\t"));
        res.end();
        return;
    }
    console.log(id);
    console.log(password);
    console.log(admin);

    if((admin._id==id)&&(admin.password==password)){
        res.write(JSON.stringify({
        "success": true,
        "user": Admin
        }, null, "\t"));
        res.end();
        return;
    } else{
        res.write(JSON.stringify({
            "success": false,
            "message": "Wrong password or id"
            }, null, "\t"));
            res.end();
            return;
    }

    
    


}

exports.adminChangePassword=async(req,res,next)=>{
    var id=req.body.id;
    var oldPassword=req.body.oldPassword;
    var newPassword=req.body.newPassword;
    var admin;
    /////////////////////////////
    try{
        admin = await Admin.adminChangePassword(id,oldPassword,newPassword);
        
    } catch{
        res.write(JSON.stringify({
            "success": false,
            "message": "Can't change password",
        }, null, "\t"));
        res.end();
        return;
    }
    
    console.log(admin);

    if((admin._id==id)&&(admin.password==newPassword)){
        res.write(JSON.stringify({
        "success": true,
        "user": Admin,
        "message": "Successfully change password"
        }, null, "\t"));
        res.end();
        return;
    } else{
        res.write(JSON.stringify({
            "success": false,
            "message": "Can't change password"
            }, null, "\t"));
            res.end();
            return;
    }

}

exports.adminBlockUser=async(req,res,next)=>{
    const id=res.body.id;


}

exports.adminGetUserById=async(req,res,next)=>{

}

exports.adminGetAllUser=async(req,res,next)=>{

}