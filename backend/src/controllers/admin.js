const getDatabase = require('../util/database').getDatabase;
const Admin = require('../models/admin')
const User=require('../models/user')

const crypto = require("crypto");
const path = require("path")

const pendingAccount = {};
const pendingLogin = {};

exports.adminLogin=async(req,res,next)=>{

    const id = req.body.id;
    const password = req.body.password;

    try{
        admin = await Admin.findByIdAndPasswordd(id,password);
    } catch{
        return "False"
    }

    if (admin) {
        res.write(JSON.stringify({
            "success": false,
            "message": "This email is already in use."
        }, null, "\t"));
        res.end();
        return
    }
}

exports.adminChangePassword=async()=>{

}

exports.adminBlockUser=async(req,res,next)=>{
    const id=res.body.id;


}

exports.adminGetUserById=async(req,res,next)=>{

}

exports.adminGetAllUser=async(req,res,next)=>{

}